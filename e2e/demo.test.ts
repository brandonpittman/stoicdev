import { expect, test } from '@playwright/test';

test('home page explains what the site is', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 2, name: 'What This Site Is' })).toBeVisible();
});
