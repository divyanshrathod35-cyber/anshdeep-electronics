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
  // Lazy images intentionally do not load until near the viewport.
  // Scroll each into view so the simulated network failures are exercised.
  const hero = page.locator('.editorial-frame--hero');
  await hero.scrollIntoViewIfNeeded();
  await expect(hero.locator('svg')).toBeVisible();
  const firstCard = page.locator('.product-card').first().locator('.editorial-frame');
  await firstCard.scrollIntoViewIfNeeded();
  await expect(firstCard.locator('svg')).toBeVisible();
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

test('critical hero photograph is discoverable before React hydration', async ({ page }) => {
  await page.goto('/');
  const preload = page.locator('head > link[rel="preload"][as="image"]');
  await expect(preload).toHaveAttribute('href','/editorial/14512055.jpg');
  await expect(preload).toHaveAttribute('fetchpriority','high');
});

test('the home page is pre-rendered and readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('#root')).toHaveAttribute('data-prerendered', 'true');
    await expect(page.getByRole('heading', { name: /Good technology/ })).toBeVisible();
    await expect(page.locator('.product-card')).toHaveCount(8);
    await expect(page.getByRole('link', { name: /Open Google Maps/ })).toHaveAttribute('href', /google.com\/maps/);
  } finally {
    await context.close();
  }
});

test('hero selector advances to the chosen product category after hydration', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && /hydration|mismatch/i.test(msg.text())) consoleErrors.push(msg.text());
  });
  await page.goto('/');
  await page.getByRole('group', { name: 'Explore product families' }).getByRole('button', { name: /Cooling/ }).click();
  await expect(page.getByText('Comfort, correctly sized.')).toBeVisible();
  await page.getByRole('button', { name: /Explore cooling/ }).click();
  await expect(page.locator('.filter-list').getByRole('button', { name: /^Cooling/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.product-card')).toHaveCount(1);
  expect(consoleErrors).toEqual([]);
});

test('enquiry dialog restores keyboard focus to its originating control', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Ask for a showroom quote/i });
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Ready to ask?' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('robots.txt is served as crawl policy rather than an SPA HTML fallback', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/text\/plain/);
  const text = await response.text();
  expect(text).toContain('User-agent: *');
  expect(text).toContain('Allow: /');
  expect(text).not.toContain('<!doctype html>');
});

test('touch users can change hero chapters without breaking vertically scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const stage = page.locator('.hero-image-stage');
  await stage.scrollIntoViewIfNeeded();
  const box = await stage.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  const x = box.x + box.width * .75;
  const y = box.y + box.height * .45;
  await stage.evaluate((el, point) => {
    const start = new Event('touchstart', { bubbles: true });
    Object.defineProperty(start, 'touches', { value: [{ clientX: point.x, clientY: point.y }] });
    el.dispatchEvent(start);
    const end = new Event('touchend', { bubbles: true });
    Object.defineProperty(end, 'changedTouches', { value: [{ clientX: point.x - 115, clientY: point.y + 5 }] });
    el.dispatchEvent(end);
  }, { x, y });
  await expect(page.getByText('Made for everyday living.')).toBeVisible();
  await stage.evaluate((el, point) => {
    const start = new Event('touchstart', { bubbles: true });
    Object.defineProperty(start, 'touches', { value: [{ clientX: point.x, clientY: point.y }] });
    el.dispatchEvent(start);
    const end = new Event('touchend', { bubbles: true });
    Object.defineProperty(end, 'changedTouches', { value: [{ clientX: point.x - 4, clientY: point.y - 90 }] });
    el.dispatchEvent(end);
  }, { x, y });
  await expect(page.getByText('Made for everyday living.')).toBeVisible();
});

test('showroom phone CTA has a guaranteed opaque high-contrast surface on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const call = page.locator('.showroom-actions a.button--outline');
  await call.scrollIntoViewIfNeeded();
  const pair = await call.evaluate(el => {
    const style = getComputedStyle(el);
    return { color: style.color, background: style.backgroundColor };
  });
  expect(pair.color).toBe('rgb(15, 23, 42)');
  expect(pair.background).toBe('rgb(255, 255, 255)');
});

for (const width of [320, 360, 390, 430, 700, 768, 1024]) {
  test('final release has no document overflow on ' + width + 'px screens', async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Good technology/ })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'Horizontal page overflow at ' + width).toBeLessThanOrEqual(1);
    if ([320,390,768].includes(width)) {
      await page.screenshot({ path: testInfo.outputPath('release-' + width + '.png'), fullPage: true });
    }
  });
}

test('mobile filters expose applied scope and let shoppers reset in one tap', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/#catalog');
  await page.locator('.filter-list').getByRole('button', { name: /^Cooling/ }).click();
  await expect(page.locator('.filter-status')).toContainText('1 collection in cooling');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.locator('.filter-status').getByRole('button', { name: /Clear filters/ }).click();
  await expect(page.locator('.product-card')).toHaveCount(8);
  await expect(page.locator('.filter-status')).toContainText('8 collections to explore');
});

test('mobile menu supports Escape and updates expanded state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});

for (const route of ['privacy','terms','accessibility'] as const) {
  test(route + ' is a crawlable, responsive, accessible, independently routable policy page', async ({ page, request, browser }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const response = await request.get('/' + route + '/');
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('data-prerendered="true"');
    expect(html).toContain('https://anshdeep-electronics.vercel.app/' + route + '/');
    expect(html).not.toContain('href="/editorial/14512055.jpg"');
    await page.goto('/' + route + '/');
    await expect(page.locator('.legal-article')).toHaveCount(route === 'privacy' ? 6 : route === 'terms' ? 5 : 4);
    await expect(page.locator('.legal-contact-actions a[href^="tel:"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    const report = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    expect(report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('policy-' + route + '.png'), fullPage: true });
    const noJs = await browser.newContext({javaScriptEnabled:false});
    try {
      const read = await noJs.newPage();
      await read.goto('/' + route + '/');
      await expect(read.locator('#root')).toHaveAttribute('data-prerendered','true');
      await expect(read.locator('main h1')).toBeVisible();
    } finally { await noJs.close(); }
  });
}

test('privacy and information links are visible at important enquiry decisions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-footer').getByRole('link',{ name: /Privacy policy/ })).toHaveAttribute('href','/privacy/');
  await expect(page.locator('.site-footer').getByRole('link',{ name: /Terms of use/ })).toHaveAttribute('href','/terms/');
  await expect(page.locator('.site-footer').getByRole('link',{ name: /Accessibility/ })).toHaveAttribute('href','/accessibility/');
  await expect(page.locator('.review-form').getByRole('link',{name:/privacy policy/})).toHaveAttribute('href','/privacy/');
  await page.getByRole('button',{name:/Ask for a showroom quote/}).click();
  await expect(page.getByRole('dialog').getByRole('link',{name:/privacy policy/})).toHaveAttribute('href','/privacy/');
});

test('the sitemap declares all customer-facing static routes',async ({request})=>{
  const response=await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('<loc>https://anshdeep-electronics.vercel.app/privacy/</loc>');
  const robots=await request.get('/robots.txt');
  expect(await robots.text()).toContain('Sitemap: https://anshdeep-electronics.vercel.app/sitemap.xml');
});
