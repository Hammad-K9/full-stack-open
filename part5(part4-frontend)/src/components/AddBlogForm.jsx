import { useState } from 'react';

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          author:{' '}
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <button type="submit">add blog</button>
        </div>
      </form>
    </>
  );
};

export default AddBlogForm;
