import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should log in with correct credentials', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);

    // Fill username and trigger validation
    const usernameField = page.getByLabel('Username');
    await usernameField.fill('admin');

    // Fill password and trigger validation
    const passwordField = page.getByLabel('Password');
    await passwordField.fill('admin');

    // Wait until the button is enabled
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();

    // Click login
    await loginButton.click();

    // Example 1: check redirect to account
    await expect(page).toHaveURL('/account');
  });
});
