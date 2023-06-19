import React, { useState, useEffect } from 'react'

import loginService from '../../services/login'

import { useMatch, useNavigate } from 'react-router-dom'

import { Button, Form } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const PasswordResetToken = ({ onNotification }) => {

  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const passwordResetMatch = useMatch('/passwordreset/:id/:token')

  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {

    const matchedUserId = passwordResetMatch
      ? passwordResetMatch.params.id
      : null

    const matchedToken = passwordResetMatch
      ? passwordResetMatch.params.token
      : null

    if (matchedUserId && !userId && matchedToken && !token) {
      setUserId(matchedUserId)
      setToken(matchedToken)
    }
  }, [])

  const onSubmitForm = async (event) => {
    event.preventDefault()

    try {
      if (password !== passwordConfirm) throw new Error('Passwords don\'t match.')

      await loginService.passwordresettoken(userId, token, password)

      onNotification(t('notification-passwordchange-success'), 'success')

      setUserId('')
      setToken('')
      setPassword('')
      setPasswordConfirm('')

      navigate('/')
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message

      onNotification(errorMessage, 'danger')
    }
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('user-form-passwordreset')}</h2>
      </header>
      <main>
        <Form id="passwordResetTokenForm" onSubmit={onSubmitForm}>
          <Form.Group className="mb-5">
            <Form.Label htmlFor="password">{t('user-form-password')}</Form.Label>
            <Form.Control type="password"
              id="password"
              name="password"
              className="mb-3"
              placeholder={t('user-form-password')}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />

            <Form.Label htmlFor="passwordConfirm">{t('user-form-passwordconfirm')}</Form.Label>
            <Form.Control type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="mb-3"
              placeholder={t('user-form-passwordconfirm')}
              value={passwordConfirm}
              onChange={({ target }) => setPasswordConfirm(target.value)}
              required
            />
          </Form.Group>

          <Button id="submitPasswordResetToken" variant="primary" type="submit">{t('user-form-resetpassword')}</Button>
        </Form>
      </main>
    </section>
  )
}

export default PasswordResetToken