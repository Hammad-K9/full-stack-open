import axios from 'axios';

const baseUrl = 'api/contacts';

const getResponseData = (request) => request.then((response) => response.data);

const getAll = () => getResponseData(axios.get(baseUrl));

const create = (newObject) => getResponseData(axios.post(baseUrl, newObject));

const deleteContact = (id) => getResponseData(axios.delete(`${baseUrl}/${id}`));

const updateNumber = (id, updatedContact) =>
  getResponseData(axios.put(`${baseUrl}/${id}`, updatedContact));

export default { getAll, create, deleteContact, updateNumber };
