import { test, expect } from '@playwright/test';

test.describe('Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test.describe('Posts Page', () => {
    test('should render posts from API response', async ({ page }) => {
      await page.goto('/posts');

      // Wait for the /api/posts response
      const [response] = await Promise.all([
        page.waitForResponse(
          (res) => res.url().includes('/api/posts') && res.status() === 200,
        ),
        page.waitForLoadState('networkidle'),
      ]);

      const data = await response.json();
      expect(Array.isArray(data.items)).toBeTruthy();
      expect(data.items.length).toBeGreaterThan(0);

      for (const [i, post] of data.items.entries()) {
        const card = page.locator('.v-card').nth(i);

        // Title & description
        await expect(card.getByText(post.title)).toBeVisible();
        await expect(card.getByText(post.description)).toBeVisible();

        // Views → div containing the 👁 icon
        // const viewsDiv = card
        //   .locator('div', { has: card.locator('svg[aria-hidden="true"]') })
        //   .filter({
        //     hasText: post.views.toString(),
        //   });
        // await expect(viewsDiv).toBeVisible();

        // Likes → button with ❤️ icon + number
        // const likeButton = card.getByRole('button', {
        //   name: post.likes.toString(),
        // });
        // await expect(likeButton).toBeVisible();
      }
    });
  });

  test('should load more posts on scroll', async ({ page }) => {
    const posts = page.locator('.v-card');
    const initialCount = await posts.count();

    // Scroll down to trigger infinite scroll
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(1500); // wait for loading

    const newCount = await posts.count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  // test('should navigate to create post page when clicking + button', async ({
  //   page,
  // }) => {
  //   await page.click('.post-button');
  //   await expect(page).toHaveURL('/posts/create');
  // });
});
