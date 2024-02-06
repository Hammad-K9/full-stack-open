const Form = (props) => (
  <>
    <h2>Add new contact</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} 
          onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} 
          onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

export default Form