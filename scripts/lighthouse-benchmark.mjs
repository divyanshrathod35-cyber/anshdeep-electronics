/**
 * Lab-only local Lighthouse measurements; NOT field Core Web Vitals.
 * Run after npm run build and npx playwright install chromium.
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { preview } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';

const stamp = new Date().toISOString();
await mkdir('quality-reports', { recursive: true });
const server = await preview({ preview: { port: 4173, strictPort: true, host: '127.0.0.1' } });
const browser = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
});
const url = 'http://127.0.0.1:4173/';
const results = {
  runAt: stamp,
  provenance: 'GitHub Actions Ubuntu Lighthouse lab (simulated throttling), not real-user Core Web Vitals',
  url: '/ (local preview only)',
  variants: {},
};
try {
  for (const variant of [
    { name: 'mobile', formFactor: 'mobile', mobile: true, width: 375, height: 812, deviceScaleFactor: 2 },
    { name: 'desktop', formFactor: 'desktop', mobile: false, width: 1440, height: 900, deviceScaleFactor: 1 },
  ]) {
    const config = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: variant.formFactor,
        screenEmulation: {
          mobile: variant.mobile, width: variant.width,
          height: variant.height, deviceScaleFactor: variant.deviceScaleFactor,
          disabled: false,
        },
        throttlingMethod: 'simulate',
      },
    };
    const run = await lighthouse(url, {
      port: browser.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      logLevel: 'error',
    }, config);
    if (!run) throw new Error('Lighthouse returned no result for ' + variant.name);
    const score = id => Math.round((run.lhr.categories[id]?.score ?? 0) * 100);
    const metric = id => run.lhr.audits[id]?.numericValue ?? null;
    results.variants[variant.name] = {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
      lcpMs: metric('largest-contentful-paint'),
      cls: metric('cumulative-layout-shift'),
      tbtMs: metric('total-blocking-time'),
      fcpMs: metric('first-contentful-paint'),
    };
    await writeFile('quality-reports/lighthouse-' + variant.name + '.json', run.report);
    console.log(variant.name.toUpperCase() + ' LAB METRICS ' + JSON.stringify(results.variants[variant.name]));
  }
  await writeFile('quality-reports/lab-summary.json', JSON.stringify(results, null, 2) + '\n');
  console.log('Local quality report: quality-reports/lab-summary.json');
} finally {
  await browser.kill();
  await new Promise(resolve => server.httpServer.close(resolve));
}
