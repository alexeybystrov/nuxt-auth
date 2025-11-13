import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should log in with correct credentials', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);

    // Fill username
    await page.getByLabel('Username').fill('admin');

    // Fill password
    await page.getByLabel('Password').fill('admin');

    // Wait until the button is enabled
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();

    // Click login
    await loginButton.click();

    // Example 1: check redirect to account
    await expect(page).toHaveURL('/account');
  });
});
