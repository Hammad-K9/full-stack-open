import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'
import countriesService from './services/countriesService'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries.map(c => (
          { 
            id: c.cca3,
            cca2: c.cca2,
            name: c.name.common,
            capital: c.capital,
            area: c.area,
            languages: c.languages instanceof Object ? 
              Object.values(c.languages) : [],
            flag: c.flag
          }
          )))
      })
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const showCountry = id => {
    setSelectedId(id)
  }

  const filteredCountries = search ? countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())) : []

  const selectedCountry = filteredCountries.find(c => c.id === selectedId)
  const nonSelectedCountry = filteredCountries.filter (c => c.id !== selectedId)

  return (
    <div>
      <Search search={search} onChange={handleChange}/>
      <Countries countries={nonSelectedCountry} showCountry={showCountry} />
      <Country country={selectedCountry} />
    </div>
  )
}

export default App