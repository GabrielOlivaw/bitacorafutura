import React from 'react'

import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const UserForm = ({
  attrLabel,
  username, setUsername, usernameError,
  name, setName, nameError,
  password, setPassword, passwordError,
  passwordConfirm, setPasswordConfirm,
  email, setEmail, emailError,
  submitText, onSubmit, required }) => {

  const { t } = useTranslation()

  return (
    <>
      <Form id={`${attrLabel}UserForm`} onSubmit={onSubmit}>
        <Form.Group className="mb-5">
          <Form.Label htmlFor="username">{t('user-form-username')}</Form.Label>
          <Form.Control type="text"
            id="username"
            name="username"
            className="mb-3"
            placeholder={t('user-form-username')}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required={required}
            isInvalid={usernameError !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {usernameError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label htmlFor="name">{t('user-form-name')}</Form.Label>
          <Form.Control type="text"
            id="name"
            name="name"
            className="mb-3"
            placeholder={t('user-form-name')}
            value={name}
            onChange={({ target }) => setName(target.value)}
            required={required}
            isInvalid={nameError !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {nameError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label htmlFor="password">{t('user-form-password')}</Form.Label>
          <Form.Control type="password"
            id="password"
            name="password"
            className="mb-3"
            minLength={8}
            placeholder={t('user-form-password')}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required={required}
            isInvalid={passwordError !== ''}
          />

          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>

          <Form.Label htmlFor="passwordConfirm">{t('user-form-passwordconfirm')}</Form.Label>
          <Form.Control type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            className="mb-3"
            minLength={8}
            placeholder={t('user-form-passwordconfirm')}
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
            required={required}
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label htmlFor="email">{t('user-form-email')}</Form.Label>
          <Form.Control type="email"
            id="email"
            name="email"
            className="mb-3"
            placeholder={t('user-form-email')}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required={required}
            isInvalid={emailError !== ''}
          />

          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>

        <Button id="submitButton" variant="primary" type="submit">{submitText}</Button>
      </Form>
    </>
  )
}

export default UserForm