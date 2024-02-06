import axios from 'axios'
const baseUrl = 'http://localhost:3001/contacts'

const getResponseData = request => {
  return request.then(response => response.data)
}

const getAll = () => {
  return getResponseData(axios.get(baseUrl))
}

const create = newObject => {
  return getResponseData(axios.post(baseUrl, newObject))
}

const deleteContact = id => {
  return getResponseData(axios.delete(`${baseUrl}/${id}`))
}

const updateNumber = (id, updatedContact) => {
  return getResponseData(axios.put(`${baseUrl}/${id}`, updatedContact))
}

export default { getAll, create, deleteContact, updateNumber }