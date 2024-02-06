import { useState, useEffect } from 'react'
import getWeather from '../services/weatherService'

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeather(country.capital, country.cca2)
    .then(w => {
      setWeather(w)
    })
  }, [country])
  return weather === null ? null : 
  <div>
    <div>Temperature: {Math.round(weather.main.temp-273.15)} &deg;C</div>
    <img 
    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
    alt={weather.weather[0].description} />
    <div>Wind: {weather.wind.speed} m/s</div>
  </div>
}

export default Weather