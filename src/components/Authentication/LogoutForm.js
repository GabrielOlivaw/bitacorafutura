import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useUserContext } from '../../UserContext'

import { useTranslation } from 'react-i18next'

const LogoutForm = () => {

  const userCtx = useUserContext()

  const { t } = useTranslation()

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('bitacorafutura-user')
    userCtx.setUser({})
  }

  return (
    <>
      <Form id="logoutForm" onSubmit={handleLogout}>
        <Button id="logoutButton" variant="secondary" type="submit">{t('user-logout')}</Button>
      </Form>
    </>
  )
}

export default LogoutForm