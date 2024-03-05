const Login = (props) => (
  <div>
    <h2>login to application</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        username:
        <input
          type="text"
          value={props.username}
          onChange={props.usernameOnChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={props.password}
          onChange={props.passwordOnChange}
        />
      </div>
      <button>login</button>
    </form>
  </div>
);

export default Login;
