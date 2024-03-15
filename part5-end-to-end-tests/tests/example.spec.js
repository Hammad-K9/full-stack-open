const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'blahUser',
        name: 'blahName',
        password: 'blahPassword'
      }
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login to application')).toBeVisible();
  });

  describe('Login', () => {
    test('Successful user log in', async ({ page }) => {
      await loginWith(page, 'blahUser', 'blahPassword');
      await expect(page.getByText('blahName is logged in')).toBeVisible();
    });

    test('Failed user log in due to wrong username and/or password', async ({
      page
    }) => {
      await loginWith(page, 'someUsername', 'blahPassword');

      await expect(page.getByText('blahName is logged in')).not.toBeVisible();
      await expect(page.getByText('Wrong username or password')).toBeVisible();

      await loginWith(page, 'blahUser', 'somePassword');

      await expect(page.getByText('blahName is logged in')).not.toBeVisible();
      await expect(page.getByText('Wrong username or password')).toBeVisible();

      await loginWith(page, 'someUsername', 'somePassword');

      await expect(page.getByText('blahName is logged in')).not.toBeVisible();
      await expect(page.getByText('Wrong username or password')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'blahUser', 'blahPassword');
      await createBlog(page, 'TiTlE', 'AuThOr', 'www.UrL.com');
    });

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('TiTlE AuThOr')).toBeVisible();
    });

    test('a blog can be edited', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      const likesElement = await page.getByTestId('like');

      await expect(likesElement).toContainText('0');

      await page.getByRole('button', { name: 'like' }).click();
      await likesElement.waitFor();

      await expect(likesElement).toContainText('1');
      await expect(likesElement).not.toContainText('0');
    });

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      page.on('dialog', (dialog) => dialog.accept());
      await page.getByRole('button', { name: 'delete' }).click();
      await expect(page.getByText('TiTlE AuThOr')).not.toBeVisible();
    });

    test('blogs are sorted by number of likes', async ({ page }) => {
      await createBlog(page, 'TiTlE2', 'AuThOr2', 'www.UrL2.com');
      await page.getByRole('button', { name: 'view' }).last().click();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.locator('.blog').first()).toContainText(
        'TiTlE2 AuThOr2'
      );
      await expect(page.locator('.blog').last()).toContainText('TiTlE AuThOr');
    });
  });

  describe('Log in to different user', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'blahUser', 'blahPassword');
      await createBlog(page, 'TiTlE', 'AuThOr', 'www.UrL.com');
      await request.post('/api/users', {
        data: {
          username: 'blahUser2',
          name: 'blahName2',
          password: 'blahPassword2'
        }
      });
    });

    test('only user who added the blog can see delete button', async ({
      page
    }) => {
      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, 'blahUser2', 'blahPassword2');
      await page.getByRole('button', { name: 'view' }).click();
      await expect(
        page.getByRole('button', { name: 'delete' })
      ).not.toBeVisible();
    });
  });
});
