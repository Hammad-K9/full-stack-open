import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY

const getCity = (city, country) => {
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},,${country}&limit=5&appid=${apiKey}`)
    .then(response => response.data)
    .then(cities => cities[0])
    .then(data => getWeatherData(data.lat, data.lon))
    .catch(error => {
      console.log(`Failed to get city. Error: ${error}`)
    })
}

const getWeatherData = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.data)
    .catch(error => {
      console.log(`Failed to get weather. Error: ${error}`)
    })
}

export default getCity 