import React, { useState } from 'react'

import userService from '../../services/users'

import { useUserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'

import { loginUserNew } from '../../auth/authenticate'

import UserForm from './UserForm'

import { useTranslation } from 'react-i18next'

const SignUpForm = ({ onNotification }) => {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')

  const [usernameError, setUsernameError] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const userCtx = useUserContext()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleSignUp = async (event) => {
    event.preventDefault()

    if (password !== passwordConfirm) {
      onNotification(t('notification-passwordmismatch-error'), 'warning')
    }
    else if (username.length < 8) {
      onNotification(t('notification-usernamelength-error', { length: 3 }), 'warning')
    }
    else {
      try {
        await userService.create({
          username, name, password, email
        })
        onNotification(t('notification-signup-success', { username }), 'success')

        loginUserNew(userCtx, username, password)

        setUsername('')
        setName('')
        setPassword('')
        setPasswordConfirm('')
        setEmail('')

        setUsernameError('')
        setNameError('')
        setPasswordError('')
        setEmailError('')

        navigate('/')
      } catch (error) {
        const errors = error.response.data.error.errors

        if (errors) {
          errors.forEach(error => {

            switch (error.field) {
            case 'username':
              setUsernameError(error.message)
              break
            case 'name':
              setNameError(error.message)
              break
            case 'password':
              setPasswordError(error.message)
              break
            case 'email':
              setEmailError(error.message)
              break
            }
          })
        }
        else {
          if (error.response.data.field === 'password') {
            setPasswordError(error.response.data.error)
          }
          else {
            onNotification(error.response.data.error, 'danger')
          }
        }
      }
    }
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('user-signup')}</h2>
      </header>
      <main>
        <UserForm attrLabel="new"
          username={username} setUsername={setUsername}
          name={name} setName={setName}
          password={password} setPassword={setPassword}
          passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}
          email={email} setEmail={setEmail}
          usernameError={usernameError} nameError={nameError}
          passwordError={passwordError} emailError={emailError}
          submitText={t('user-signup')} onSubmit={handleSignUp} required />
      </main>
    </section>
  )
}

export default SignUpForm