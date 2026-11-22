import AxeBuilder from '@axe-core/playwright';
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
  await page.getByRole('button', { name: 'Compare Inverter air conditioners' }).click();
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

test('all eight curated editorial images are self-hosted and the hero loads locally', async ({ request, page }) => {
  const ids = [38788452, 14512055, 9403822, 8805274, 8142971, 8054764, 15670390, 25636747];
  for (const id of ids) {
    const response = await request.get('/editorial/' + id + '.jpg');
    expect(response.status(), 'Pinned image ' + id + ' should exist').toBe(200);
    expect(response.headers()['content-type']).toContain('image/jpeg');
    expect((await response.body()).byteLength).toBeGreaterThan(4096);
  }
  await page.goto('/');
  const hero = page.locator('.editorial-frame--hero img');
  await expect(hero).toHaveAttribute('src', '/editorial/14512055.jpg');
  await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth), { timeout: 10000 }).toBeGreaterThan(0);
});

test('mobile contextual enquiry appears after browsing and can be opened', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Quick showroom enquiry' })).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 850));
  await expect(page.getByRole('region', { name: 'Quick showroom enquiry' })).toBeVisible();
  await page.getByRole('button', { name: 'Ask the store' }).click();
  await expect(page.getByRole('dialog', { name: 'Ready to ask?' })).toBeVisible();
});

test('reduced motion keeps scroll narratives readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.interlude-columns')).toBeVisible();
  const transition = await page.locator('.interlude-columns').evaluate(el => getComputedStyle(el).transitionDuration);
  expect(transition.split(',').every(value => Number.parseFloat(value) < 0.001)).toBe(true);
});

test('WCAG 2.2 A/AA automated audit of homepage and enquiry dialog', async ({ page }) => {
  await page.goto('/');
  const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
  const home = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(home.violations.map(issue => ({ id: issue.id, impact: issue.impact, nodes: issue.nodes.map(n => n.target) }))).toEqual([]);
  await page.getByRole('button', { name: /Ask for a showroom quote/i }).click();
  const drawer = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(drawer.violations.map(issue => ({ id: issue.id, impact: issue.impact, nodes: issue.nodes.map(n => n.target) }))).toEqual([]);
});
