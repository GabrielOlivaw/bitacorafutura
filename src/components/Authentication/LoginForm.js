import React, { useState } from 'react'

import { useUserContext } from '../../UserContext'

import { loginUserNew } from '../../auth/authenticate'
import { Button, Form } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const LoginForm = ({ onNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userCtx = useUserContext()

  const { t } = useTranslation()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      await loginUserNew(userCtx, username, password)

      setUsername('')
      setPassword('')
    } catch (error) {
      onNotification(error.response.data.error, 'danger')
    }
  }

  return (
    <>
      <Form id="loginForm" onSubmit={handleLogin}>
        <Form.Control type="text"
          id="username"
          name="username"
          className="mb-3"
          placeholder={t('user-form-username')}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Control type="password"
          id="password"
          name="password"
          className="mb-3"
          placeholder={t('user-form-password')}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button id="loginButton" className="mb-2" variant="primary" type="submit">{t('user-login')}</Button>

        <a className="passwordForgotLink" href="/passwordforgot">{t('user-login-forgotpassword')}</a>
      </Form>
    </>
  )
}

export default LoginForm