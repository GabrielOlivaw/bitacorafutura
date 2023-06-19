import axios from 'axios'
import { token, lang } from './headers'

const baseUrl = '/api/blogs'

const getAll = async (page = 1, search = '', tag = '') => {
  const config = {
    headers: { 'Accept-Language': lang }
  }

  let url = `${baseUrl}?page=${page}`
  if (search) {
    url += `&search=${search}`
  }
  if (tag) {
    url += `&tag=${tag}`
  }

  const response = await axios.get(url, config)
  return response.data
}

const getOne = async (id) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getAllComments = async (id, page = 1) => {
  const config = {
    headers: { 'Accept-Language': lang }
  }
  const response = await axios.get(`${baseUrl}/${id}/comments?page=${page}`, config)
  return response.data
}

const createComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

const removeComment = async (blogId, commentId) => {
  const config = {
    headers: { Authorization: token, 'Accept-Language': lang }
  }
  await axios.delete(`${baseUrl}/${blogId}/comments/${commentId}`, config)
}

export default {
  getAll, getOne, create, update, remove,
  getAllComments, createComment, removeComment
}