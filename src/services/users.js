import axios from 'axios'
import { token, lang } from './headers'

const baseUrl = '/api/users'

const getAll = async (page = 1, search = '') => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }

  let url = `${baseUrl}?page=${page}`
  if (search) {
    url += `&search=${search}`
  }

  const response = await axios.get(url, config)
  return response.data
}

const getMe = async () => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.get(`${baseUrl}/me`, config)
  return response.data
}

const create = async (newCredentials) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.post(baseUrl, newCredentials, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const updateRole = async (userId, newRole) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.put(`${baseUrl}/${userId}/role`, { newRole }, config)
  return response.data
}

const remove = async (userId) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }

  const response = await axios.delete(`${baseUrl}/${userId}`, config)
  return response.data
}

export default { getAll, getMe, create, update, updateRole, remove }