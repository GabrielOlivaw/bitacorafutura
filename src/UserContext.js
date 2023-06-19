import React, { useState, useContext } from 'react'

import { roles } from './utils/utils'

const UserContext = React.createContext()

export const useUserContext = () => {
  return useContext(UserContext)
}

const hasUserPermissions = (role) => {
  return roles.indexOf(role) >= roles.indexOf('USER')
}

const hasAuthorPermissions = (role) => {
  return roles.indexOf(role) >= roles.indexOf('AUTHOR')
}

const hasAdminPermissions = (role) => {
  return roles.indexOf(role) >= roles.indexOf('ADMIN')
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const value = {
    user: {
      ...user,
      isLogged: hasUserPermissions(user.role),
      beAuthor: hasAuthorPermissions(user.role),
      isAdmin: hasAdminPermissions(user.role)
    },
    setUser: setUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}