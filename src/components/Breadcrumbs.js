import React from 'react'

import { useNavigate } from 'react-router-dom'

import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Breadcrumb } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const Breadcrumbs = () => {

  const { t } = useTranslation()

  const routes = [
    { path: '/blogs/create', breadcrumb: t('breadcrumb-blogs-new') },
    { path: '/blogs', breadcrumb: t('breadcrumb-blogs') },
    { path: '/users/:id/edit', breadcrumb: t('breadcrumb-user-edit') },
    { path: '/passwordforgot', breadcrumb: t('breadcrumb-user-passwordforgot') },
    { path: '/administration', breadcrumb: t('breadcrumb-admin') },
    { path: '/', breadcrumb: t('breadcrumb-home') }
  ]

  const navigate = useNavigate()

  const breadcrumbs = useBreadcrumbs(routes, { excludePaths:
    [
      '/blogs', '/blogs/:id',
      '/users', '/users/:id',
      '/passwordreset', '/passwordreset/:id', '/passwordreset/:id/:token'
    ]
  })

  const onClickBreadcrumb = (event, href) => {
    event.preventDefault()

    navigate(href)
  }

  return (
    <React.Fragment>
      <div className="">
        <Breadcrumb>
          {breadcrumbs.map(({ breadcrumb }) => {
            return (
              <Breadcrumb.Item key={breadcrumb.key} href={breadcrumb.key}
                onClick={(event) => onClickBreadcrumb(event, breadcrumb.key)}>
                {breadcrumb}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>

      </div>
    </React.Fragment>
  )
}

export default Breadcrumbs