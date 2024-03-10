import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.url.com',
    likes: 169,
    user: {
      id: 'userId',
      name: 'username'
    }
  };

  test('renders only blog title and author', () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.blog');

    expect(div).toHaveTextContent('title');
    expect(div).toHaveTextContent('author');
    expect(screen.queryByText('www.url.com')).not.toBeInTheDocument();
    expect(screen.queryByText('169')).not.toBeInTheDocument();
    expect(screen.queryByText('username')).not.toBeInTheDocument();
  });

  test('clicking the button calls event handler once', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} handleLikes={mockHandler} />);
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    expect(screen.queryByText('www.url.com')).toBeInTheDocument();
    expect(screen.queryByText('169')).toBeInTheDocument();
    expect(screen.queryByText('username')).toBeInTheDocument();
  });

  test('click like button twice', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} handleLikes={mockHandler} />);
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const likeButton = screen.getByText('like');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
