import '../../index.css'
import Country from './Country'

const Countries = ({countries, showCountry}) => {
  if (countries.length === 0) return null
  if (countries.length > 10) {
    return (
      <div>Too many countries, specify your your search</div>
    )
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(c => (
        <div key={c.id}>
          {c.name} <button onClick={() => showCountry(c.id)}>show</button>
        </div>
        ))}
      </div>
    )
  }
  return <Country country={countries[0]} />
}

export default Countries