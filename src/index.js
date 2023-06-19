import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'

import { UserProvider } from './UserContext'

import i18next from './i18n'

i18next.changeLanguage()

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
  , document.getElementById('root')
)
