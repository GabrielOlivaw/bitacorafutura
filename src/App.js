import React, { useEffect } from 'react'

import {
  Routes, Route, Navigate
} from 'react-router-dom'

import './App.css'

import { setLang } from './services/headers'

import Header from './components/Header'

import SignUpForm from './components/Authentication/SignUpForm'
import BlogsList from './components/Blogs/BlogsList'
import Blog from './components/Blogs/Blog'

import { useUserContext } from './UserContext'
import NewBlog from './components/Blogs/NewBlog'

import { loginUserStartup } from './auth/authenticate'
import EditBlog from './components/Blogs/EditBlog'
import Administration from './components/Administration'
import EditUserForm from './components/Authentication/EditUserForm'
import PasswordResetEmail from './components/Authentication/PasswordResetEmail'
import PasswordResetToken from './components/Authentication/PasswordResetToken'

import { Alert } from 'react-bootstrap'

import { useNotifications } from './hooks'
import Footer from './components/Footer'

const App = () => {

  const userCtx = useUserContext()

  const notifications = useNotifications()

  useEffect(() => {
    loginUserStartup(userCtx)

    setLang(window.localStorage.getItem('i18nextLng'))
  }, [])

  const showNotification = (message, variant) => {
    notifications.newNotification(message, variant, 10000)
  }

  const renderIfUnloggedUser = (element) => {
    return !userCtx.user.username
      ? element
      : <Navigate to='/' replace />
  }

  const renderIfAdmin = (element) => {
    return userCtx.user.isAdmin
      ? element
      : <Navigate to='/' replace />
  }

  const renderIfBlogAuthor = (element) => {
    return userCtx.user.beAuthor
      ? element
      : <Navigate to='/' replace />
  }

  return (
    <div className="App">
      <div className="notificationsContainer position-fixed w-25 mx-auto end-50">
        {notifications.notifications.map(notification =>
          <Alert key={notification.id} variant={notification.variant} onClose={() => notification.dismiss()} dismissible>
            {notification.message}
          </Alert>
        )}
      </div>
      <Header onNotification={showNotification} />
      <main className="mainPageContent mt-5">
        <Routes>
          <Route path='/signup' element={
            renderIfUnloggedUser(<SignUpForm onNotification={showNotification} />)
          } />

          <Route path='/passwordreset/:id/:token' element={
            renderIfUnloggedUser(<PasswordResetToken onNotification={showNotification} />)
          } />

          <Route path='/passwordforgot' element={
            renderIfUnloggedUser(<PasswordResetEmail onNotification={showNotification} />)
          } />

          <Route path='/administration' element={
            renderIfAdmin(<Administration onNotification={showNotification} />)
          } />

          <Route path='/users/:id/edit' element={<EditUserForm onNotification={showNotification} />} />

          <Route path='/blogs/create' element={
            renderIfBlogAuthor(<NewBlog onNotification={showNotification} />)
          } />

          <Route path='/blogs/:id' element={<Blog onNotification={showNotification} />} />

          <Route path='/blogs/:id/edit' element={
            renderIfBlogAuthor(<EditBlog onNotification={showNotification} />)
          } />

          <Route path='/blogs' element={<Navigate to='/' replace />} />

          <Route path='/' element={<BlogsList onNotification={showNotification} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
