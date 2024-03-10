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

  useEffect(() => {
    blogService.getAll().then((list) => {
      list.sort((a, b) => b.likes - a.likes);
      setBlogs(list);
    });
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

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObj).then((b) => {
      setBlogs(blogs.concat(b));
      setMessage(`a new blog ${b.title} by ${b.author} has been added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      setIsError(false);
    });
  };

  const handleLikes = (blog) => {
    blogService
      .update({ ...blog, likes: blog.likes + 1 }, blog.id)
      .then((response) => {
        setBlogs(
          blogs
            .map((b) =>
              b.id === blog.id ? { ...b, likes: response.likes } : b
            )
            .sort((a, b) => b.likes - a.likes)
        );
      });
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs(
          blogs
            .filter((b) => b.id !== blog.id)
            .sort((a, b) => b.likes - a.likes)
        );
      });
    }
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
            <button className="logged-in-button" onClick={handleLogout}>
              logout
            </button>
          </div>
          {console.log(blogs)}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={handleLikes}
              canDelete={blog.user && blog.user.username === user.username}
              deleteBlog={deleteBlog}
            />
          ))}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <AddBlogForm createBlog={addBlog} />
          </Togglable>
        </>
      )}
    </div>
  );
};

export default App;
