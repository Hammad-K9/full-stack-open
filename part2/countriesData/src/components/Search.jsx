const Search = ({search, onChange}) => (
  <div>
    Find countries: <input value={search} 
    onChange={onChange} />
  </div>
)

export default Search