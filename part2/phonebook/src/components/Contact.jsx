const Contact = ({contact: c, onClick}) => (
  <div>
    {c.name} {c.number} <button onClick={onClick}>delete</button>
  </div>
)

export default Contact