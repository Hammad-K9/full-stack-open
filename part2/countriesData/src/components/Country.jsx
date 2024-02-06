import Weather from './Weather'

const Country = ({country}) => {
  return !country ? null :
  (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <div>
        <h3>languages: </h3>
        <ul>
          {country.languages.map(l => <li key={l}>{l}</li>)}
        </ul>
      </div>
      <div className="flag">{country.flag}</div>
      <Weather country={country} />
    </div>
  )
}

export default Country