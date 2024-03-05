import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Login from './components/Login';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import '../index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((list) => setBlogs(list));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      setUser(u);
      blogService.setToken(u.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const u = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedInUser', JSON.stringify(u));
      setUser(u);
      blogService.setToken(u.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong username or password');
      setIsError(true);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    blogService.setToken(null);
    setUser(null);
  };

  const blogFormRef = useRef();

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };
    blogFormRef.current.toggleVisibility();
    blogService.create(newBlog).then((b) => {
      setBlogs(blogs.concat(b));
      setMessage(`a new blog ${b.title} by ${b.author} has been added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      setIsError(false);
      setTitle('');
      setAuthor('');
      setUrl('');
    });
  };

  return (
    <div>
      <Notification message={message} isError={isError} />
      {user === null ? (
        <Login
          onSubmit={handleLogin}
          username={username}
          usernameOnChange={(e) => setUsername(e.target.value)}
          password={password}
          passwordOnChange={(e) => setPassword(e.target.value)}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <div className="logged-in">
            {user.name} is logged in
            <button
              className="logged-in-button"
              type="submit"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <AddBlogForm
              onSubmit={addBlog}
              titleOnChange={(e) => setTitle(e.target.value)}
              title={title}
              authorOnChange={(e) => setAuthor(e.target.value)}
              author={author}
              urlOnChange={(e) => setUrl(e.target.value)}
              url={url}
            />
          </Togglable>
        </>
      )}
    </div>
  );
};

export default App;
