import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render the Home title and paragraph', async ({ page }) => {
    await page.goto('/');

    // wait until h1 appears
    await page.waitForSelector('h1');

    // Check if <h1>Home</h1> exists
    await expect(page.locator('h1')).toHaveText('Home');

    // Check paragraph contains lorem ipsum
    await expect(page.locator('p')).toContainText('Lorem ipsum dolor sit amet');
  });
});
