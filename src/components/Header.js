import React from 'react'

import LoginForm from './Authentication/LoginForm'
import LogoutForm from './Authentication/LogoutForm'
import Breadcrumbs from './Breadcrumbs'
import NavigateAnchor from './NavigateAnchor'
import { useUserContext } from '../UserContext'
import { Dropdown, Stack } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const Header = ({ onNotification }) => {

  const userCtx = useUserContext()

  const { t } = useTranslation()

  return (
    <header className="pageHeader">
      <div className="siteLogo">
        <img src="/img/logo.png" className="siteLogoImg logo1 mx-2" />
        <h1 className="pageTitle">{t('page-title')}</h1>
        <img src="/img/logo.png" className="siteLogoImg logo2 mx-2" />
      </div>
      <Stack direction="horizontal" className="my-3 p-3 futura-toolbar" gap={3}>
        {
          userCtx.user.beAuthor &&
          <NavigateAnchor href="/blogs/create" className="headerButton newBlogButton"
            title={t('blog-new-blog')} variant="primary" button>{t('blog-new-blog')}</NavigateAnchor>
        }
        <div className="authForms ms-auto">
          {
            userCtx.user.username
              ?
              <Stack direction="horizontal" gap={2}>
                {
                  userCtx.user.isAdmin &&
                    <NavigateAnchor className="" href="/administration">
                      {t('user-administration')}
                    </NavigateAnchor>
                }
                <LogoutForm />
              </Stack>
              :
              <Stack direction="horizontal" gap={2}>
                <NavigateAnchor href="/signup">{t('user-signup')}</NavigateAnchor>
                <Dropdown>
                  <Dropdown.Toggle>{t('user-login')}</Dropdown.Toggle>
                  <Dropdown.Menu id="dropdownLogin" className="futura-toolbar">
                    <LoginForm onNotification={onNotification} />
                  </Dropdown.Menu>
                </Dropdown>
              </Stack>
          }
        </div>
      </Stack>
      {userCtx.user.username &&
        <Stack className="mt-2" direction="horizontal" gap={2}>
          <NavigateAnchor className="mb-0 ms-auto" href={`/users/${userCtx.user.id}/edit`}
            title={t('user-form-edituser')}>
            {userCtx.user.name || userCtx.user.username}
          </NavigateAnchor>
        </Stack>
      }
      <Breadcrumbs />
    </header>
  )
}

export default Header