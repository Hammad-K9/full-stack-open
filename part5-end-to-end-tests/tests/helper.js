const loginWith = async (page, username, password) => {
  const textboxes = await page.getByRole('textbox').all();

  await textboxes[0].fill(username);
  await textboxes[1].fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();

  const textboxes = await page.getByRole('textbox').all();

  await textboxes[0].fill(title);
  await textboxes[1].fill(author);
  await textboxes[2].fill(url);
  await page.getByRole('button', { name: 'add blog' }).click();
  await page.getByText(`${title} ${author}`).waitFor();
};

export { loginWith, createBlog };
