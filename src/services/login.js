import axios from 'axios'
import { lang } from './headers'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const passwordresetemail = async (email) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.post(`${baseUrl}/passwordreset`, { email }, config)
  return response.data
}

const passwordresettoken = async (userId, token, password) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.post(`${baseUrl}/passwordreset/${userId}/${token}`, { password }, config)
  return response.data
}

export default { login, passwordresetemail, passwordresettoken }