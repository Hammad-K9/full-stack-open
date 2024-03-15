import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, handleLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    margin: '15px 0'
  };

  return showDetails ? (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(false)}>hide</button>
      <div>{blog.url}</div>
      <div>
        <span data-testid="like">{blog.likes} </span>
        <button onClick={() => handleLikes({ ...blog, user: blog.user.id })}>
          like
        </button>
      </div>
      <div>{blog.user.name || user.name}</div>
      {/* For the line below, the left side of the || comparison checks if
      the user IDs are the same (initially, blog.user only maps to the user ID 
      as seen in the backend post request for adding blogs). On the right side 
      of the || comparison, if blogs.user contains the user object, then you 
      simply compare both IDs */}
      {user && (user.id === blog.user || user.id === blog.user.id) && (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
    </div>
  ) : (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(true)}>view</button>
    </div>
  );
};

export default Blog;
