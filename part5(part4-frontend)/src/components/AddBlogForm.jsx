const AddBlogForm = (props) => (
  <>
    <h2>Add new blog</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        title: <input value={props.title} onChange={props.titleOnChange} />
      </div>
      <div>
        author: <input value={props.author} onChange={props.authorOnChange} />
      </div>
      <div>
        url: <input value={props.url} onChange={props.urlOnChange} />
      </div>
      <div>
        <button type="submit">add blog</button>
      </div>
    </form>
  </>
);

export default AddBlogForm;
