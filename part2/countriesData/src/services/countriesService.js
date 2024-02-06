import axios from 'axios';

const getAll = () => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => response.data)
    .catch(error => {
      console.log(`Failed to get countries. Error: ${error}`)
    })
};

export default { getAll }