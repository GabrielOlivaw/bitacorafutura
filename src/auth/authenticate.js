import loginService from '../services/login'
import usersService from '../services/users'
import { setToken } from '../services/headers'

export const authenticate = async (userCtx, loggedUser) => {
  setToken(loggedUser.token)

  usersService.getMe().then(user => userCtx.setUser(user))
}

export const loginUserStartup = (userCtx) => {
  const loggedUserJSON = window.localStorage.getItem('bitacorafutura-user')
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON)

    authenticate(userCtx, loggedUser)
  }
}

export const loginUserNew = async (userCtx, username, password) => {
  const loggedUser = await loginService.login({ username, password })

  window.localStorage.setItem('bitacorafutura-user', JSON.stringify(loggedUser))

  authenticate(userCtx, loggedUser)
}

export const editUserContext = (userCtx, editedUser) => {
  userCtx.setUser(editedUser)
}