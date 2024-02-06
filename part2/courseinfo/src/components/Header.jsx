const Header = ({header, type}) => 
  type === 1 ? <h1>{header}</h1> : <h2>{header}</h2> 

export default Header