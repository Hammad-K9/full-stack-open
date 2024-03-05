import { useState } from 'react';

const Blog = ({ blog, name }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    marginBottom: 5
  };
  console.log(blog, name);
  return showDetails ? (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(false)}>hide</button>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button>like</button>
      </div>
      <div>{name}</div>
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(true)}>view</button>
    </div>
  );
};

export default Blog;
