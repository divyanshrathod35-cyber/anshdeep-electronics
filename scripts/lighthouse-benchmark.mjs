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
        // Official desktop Lighthouse preset calibration: see
        // https://github.com/GoogleChrome/lighthouse/blob/main/core/config/desktop-config.js
        ...(variant.mobile ? {} : {
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        }),
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
    const seoWeaknesses = (run.lhr.categories.seo?.auditRefs || [])
      .map(ref => ({ id: ref.id, weight: ref.weight ?? 0, audit: run.lhr.audits[ref.id] }))
      .filter(item => item.weight > 0 && item.audit?.score !== null && item.audit?.score < 1)
      .map(item => ({ id: item.id, score: item.audit.score, title: item.audit.title }));
    console.log(variant.name.toUpperCase() + ' SEO ISSUES ' + JSON.stringify(seoWeaknesses));
    const a11yWeaknesses = (run.lhr.categories.accessibility?.auditRefs || [])
      .map(ref => ({ id: ref.id, weight: ref.weight ?? 0, audit: run.lhr.audits[ref.id] }))
      .filter(item => item.weight > 0 && item.audit?.score !== null && item.audit?.score < 1)
      .map(item => ({
        id: item.id, title: item.audit.title, score: item.audit.score,
        nodes: item.audit.details?.items?.slice(0, 5).map(node => node.node?.snippet || node.node?.selector || '')
      }));
    console.log(variant.name.toUpperCase() + ' ACCESSIBILITY ISSUES ' + JSON.stringify(a11yWeaknesses));
    const lcpInsights = Object.keys(run.lhr.audits).filter(key => key.includes('lcp-') || key.includes('largest-contentful-paint'));
    console.log(variant.name.toUpperCase() + ' LCP INSIGHT KEYS ' + JSON.stringify(lcpInsights));
    for (const key of lcpInsights) {
      const audit = run.lhr.audits[key];
      if (audit?.details?.items?.length) console.log(
        variant.name.toUpperCase() + ' LCP DIAGNOSTIC ' + key + ' ' +
        JSON.stringify(audit.details.items.slice(0, 2)).slice(0, 2500)
      );
    }
    await writeFile('quality-reports/lighthouse-' + variant.name + '.json', run.report);
    console.log(variant.name.toUpperCase() + ' LAB METRICS ' + JSON.stringify(results.variants[variant.name]));
    console.log(variant.name.toUpperCase() + ' LAB DIAGNOSTIC ' + JSON.stringify({
      lcpElement: run.lhr.audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet ?? null,
      renderBlocking: run.lhr.audits['render-blocking-resources']?.details?.items?.map(item => item.url)?.slice(0, 6) ?? [],
      mainThreadMs: run.lhr.audits['mainthread-work-breakdown']?.numericValue ?? null,
    }));
  }
  await writeFile('quality-reports/lab-summary.json', JSON.stringify(results, null, 2) + '\n');
  console.log('Local quality report: quality-reports/lab-summary.json');
} finally {
  await browser.kill();
  await new Promise(resolve => server.httpServer.close(resolve));
}
