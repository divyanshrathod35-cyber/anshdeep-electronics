import { test, expect } from '@playwright/test';

for (const width of [375, 834, 1440]) {
  test('home route is interactive with no horizontal overflow at ' + width + 'px', async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Good technology.');
    await expect(page.getByRole('heading', { name: /Find something/ })).toBeVisible();
    await expect(page.locator('.product-card')).toHaveCount(8);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    await page.screenshot({ path: testInfo.outputPath('home-' + width + '.png'), fullPage: true });
    await page.getByRole('button', { name: /Ask for a showroom quote/i }).click();
    await expect(page.getByRole('dialog', { name: 'Ready to ask?' })).toBeVisible();
    await expect(page.getByLabel('Your message')).toContainText('Anshdeep Electronics');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Ready to ask?' })).toBeHidden();
    expect(errors).toEqual([]);
  });
}

test('collection filtering and shortlist comparison work', async ({ page }) => {
  await page.goto('/');
  await page.locator('.filter-list').getByRole('button', { name: 'Cooling' }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Shortlist Inverter air conditioners' }).click();
  await expect(page.locator('.compare-dock')).toContainText('1 / 3');
  await page.getByRole('button', { name: /Review shortlist/ }).click();
  await expect(page.getByRole('dialog', { name: /What matters when you compare/ })).toBeVisible();
  await expect(page.locator('.compare-column li')).toHaveCount(3);
  await page.getByRole('button', { name: /Request a combined quote/ }).click();
  await expect(page.getByRole('dialog', { name: 'Ready to ask?' })).toBeVisible();
});

test('online offer form validates and drafts a transparent enquiry', async ({ page }) => {
  await page.goto('/#offer-review');
  await page.getByRole('button', { name: /Prepare my enquiry/ }).click();
  await expect(page.getByRole('alert')).toContainText('exact model');
  await page.getByLabel('Exact model or product name').fill('55 inch 4K television');
  await page.getByLabel('Online price seen').fill('49990');
  await page.getByLabel('Your mobile number').fill('9876543210');
  await page.getByRole('button', { name: /Prepare my enquiry/ }).click();
  await expect(page.getByRole('dialog', { name: 'Ready to ask?' })).toBeVisible();
  await expect(page.getByLabel('Your message')).toContainText('₹49,990');
  await expect(page.getByText('Store WhatsApp Business number has not been confirmed.')).toBeVisible();
});

test('mobile menu opens and closes without hiding navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Find your fit' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  await expect(page).toHaveURL(/#finder$/);
});

test('licensed editorial image falls back to the original vector if image CDN is unavailable', async ({ page }) => {
  await page.route('**/editorial/*.jpg', route => route.abort());
  await page.route('https://images.pexels.com/**', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.editorial-frame--hero svg')).toBeVisible();
  await expect(page.locator('.product-card').first().locator('.editorial-frame svg')).toBeVisible();
  await expect(page.getByText('Current showroom selections')).toHaveCount(0);
});
