import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, handleLikes, canDelete, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    margin: '15px 0'
  };

  return showDetails ? (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(false)}>hide</button>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <button onClick={() => handleLikes({ ...blog, user: blog.user.id })}>
          like
        </button>
      </div>
      <div>{blog.user.name || user.name}</div>
      {canDelete && <button onClick={() => deleteBlog(blog)}>delete</button>}
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(true)}>view</button>
    </div>
  );
};

export default Blog;
