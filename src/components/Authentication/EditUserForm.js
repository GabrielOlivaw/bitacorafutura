import React, { useState, useEffect } from 'react'

import userService from '../../services/users'

import { useMatch, useNavigate } from 'react-router-dom'

import UserForm from './UserForm'

import { useUserContext } from '../../UserContext'
import { editUserContext } from '../../auth/authenticate'

import { useTranslation } from 'react-i18next'

const EditUserForm = ({ onNotification }) => {

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

  const userMatch = useMatch('/users/:id/edit')
  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {
    if (userMatch.params.id !== userCtx.user.id) {
      navigate('/')
    }
  }, [])

  const handleEdit = async (event) => {
    event.preventDefault()

    if (!username && !name && !password && !email) {
      onNotification(t('notification-emptyfields-error'), 'warning')
    }
    else if (password !== passwordConfirm) {
      setPasswordError(t('notification-passwordmismatch-error'))
    }
    else {
      try {
        const editedUser = await userService.update(userCtx.user.id, {
          username, name, password, email
        })
        editUserContext(userCtx, editedUser)

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
        <h2 className="pageSection text-center my-5">{t('user-form-edituser')}</h2>
      </header>
      <main>
        <UserForm attrLabel="edit"
          username={username} setUsername={setUsername}
          name={name} setName={setName}
          password={password} setPassword={setPassword}
          passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}
          email={email} setEmail={setEmail}
          usernameError={usernameError} nameError={nameError}
          passwordError={passwordError} emailError={emailError}
          submitText={t('user-form-edituser')} onSubmit={handleEdit} />
      </main>
    </section>
  )
}

export default EditUserForm