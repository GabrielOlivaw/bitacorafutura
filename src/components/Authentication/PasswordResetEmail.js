import React, { useState } from 'react'

import loginService from '../../services/login'

import { Button, Form } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const PasswordResetEmail = ({ onNotification }) => {

  const [email, setEmail] = useState('')

  const { t } = useTranslation()

  const onSubmitForm = async (event) => {
    event.preventDefault()

    try {
      await loginService.passwordresetemail(email)

      onNotification(t('notification-passwordreset', { email }), 'success')

      setEmail('')
    } catch (error) {
      onNotification(error.response.data.error, 'danger')
    }
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('user-login-forgotpassword')}</h2>
      </header>
      <main>
        <Form id="passwordResetEmailForm" onSubmit={onSubmitForm}>
          <Form.Group className="mb-5">
            <Form.Label htmlFor="email">{t('user-form-email')}</Form.Label>
            <Form.Control
              id="email"
              name="email"
              className="mb-3"
              type="email"
              placeholder={t('user-form-email')}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </Form.Group>

          <Button id="submitPasswordResetEmail" variant="primary" type="submit">{t('user-form-sendrequest')}</Button>
        </Form>
      </main>
    </section>
  )
}

export default PasswordResetEmail