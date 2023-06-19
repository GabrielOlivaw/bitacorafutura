import React, { useState, useEffect } from 'react'
import { Button, Dropdown, DropdownButton, Stack, Table } from 'react-bootstrap'

import { useUserContext } from '../UserContext'

import {
  useSearchParams
} from 'react-router-dom'

import userService from '../services/users'

import Pagination from './Pagination'

import { roles, canModifyTargetUser } from '../utils/utils'
import ModalConfirm from './ModalConfirm'

import SearchForm from './SearchForm'

import { useTranslation } from 'react-i18next'

/*
Role column - Bootstrap dropdown with all possible roles
Admins are allowed to promote and demote users to authors
Only Superadmin (must create in backend) can promote and demote users to admins
*/
const Administration = ({ onNotification }) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [users, setUsers] = useState('')
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState({})

  const userCtx = useUserContext()

  const { t } = useTranslation()

  useEffect(() => {
    if (userCtx.user.isAdmin) {
      userService.getAll(page, search).then(users => {
        setUsers(users.docs)
        setTotalPages(users.totalPages)
      })
    }
  }, [page, search])

  if (!userCtx.user.isAdmin || !users) return null

  const onRoleChange = async (userId, newRole) => {
    // Establish all role change restrictions based on current user role
    // Restrictions are defined in the documentation for this component

    const userToModify = users.filter(user => user.id === userId)[0]

    if (canModifyTargetUser(userCtx.user.role, userToModify.role, newRole)) {
      try {

        await userService.updateRole(userId, newRole)

        const newUsers = users.map(user => {
          if (user.id === userId)
            user.role = newRole

          return user
        })
        setUsers(newUsers)
      } catch (error) {
        onNotification(error.response.data.error, 'danger')
      }
    }
    else {
      onNotification(t('notification-admin-rolechange-error'), 'danger')
    }
  }

  const onDeleteConfirm = (id, username) => {
    setUserToDelete({ id, username })
    setShowDeleteModal(true)
  }

  const onDeleteUser = async (userId) => {
    try {
      setShowDeleteModal(false)
      setUserToDelete({})

      await userService.remove(userId)

      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      onNotification(error.response.data.error, 'danger')
    }
  }

  const goToPage = (event, page) => {
    event.preventDefault()

    setSearchParams({ page })
    setPage(page)
  }

  const searchUser = (search) => {
    setSearch(search)
    setPage(1)
  }

  const resetFilters = () => {
    setSearch('')
    setPage(1)
  }

  return (
    <section>
      <header>
        <h2 className="pageSection text-center my-5">{t('admin-title')}</h2>
      </header>
      <main>
        <Stack>
          <SearchForm attrLabel="User" placeholder={t('admin-filter')} onNotification={onNotification}
            onReset={resetFilters} onSubmit={searchUser} />
          <Pagination className="administrationPagination" page={page} maxPages={totalPages} onPageChange={goToPage} />
          <Table striped responsive>
            <thead>
              <tr>
                <th>{t('admin-tableheader-ID')}</th>
                <th>{t('admin-tableheader-username')}</th>
                <th>{t('admin-tableheader-name')}</th>
                <th>{t('admin-tableheader-email')}</th>
                <th>{t('admin-tableheader-role')}</th>
                <th>{t('admin-tableheader-actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <DropdownButton title={user.role} disabled={userCtx.user.id === user.id}>
                      {roles.map(role => (
                        <Dropdown.Item key={`${role}${user.id}`}
                          onClick={() => onRoleChange(user.id, role)}>
                          {role}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </td>
                  <td>
                    <Button title={t('admin-delete-user')} variant="danger"
                      onClick={() => onDeleteConfirm(user.id, user.username)}>
                      &#128465;
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Stack>
      </main>
      <ModalConfirm
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAccept={() => onDeleteUser(userToDelete.id)}
        confirmTitle={t('admin-delete-user')}
        confirmText={t('modal-text-delete-user', { username: userToDelete.username })}
      />
    </section>
  )
}

export default Administration