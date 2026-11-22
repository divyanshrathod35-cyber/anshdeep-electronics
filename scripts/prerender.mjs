/**
 * Render homepage and information routes to real static HTML at build time.
 * Every page is usable, indexed and linkable without client JavaScript.
 */
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const origin = 'https://anshdeep-electronics.vercel.app';
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const { LegalPage, legalPages } = await vite.ssrLoadModule('/src/LegalPage.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const target = '<div id="root"></div>';
  if (!template.includes(target)) throw new Error('Missing root mount element');
  const inject = (source, markup) => source.replace(target, '<div id="root" data-prerendered="true">' + markup + '</div>');

  const home = renderToString(createElement(App));
  if (!home.includes('Good technology.') || !home.includes('ANSHDEEP') || !home.includes('/privacy/')) {
    throw new Error('Storefront prerender is missing essential content or privacy link');
  }
  await writeFile('dist/index.html', inject(template, home), 'utf8');
  console.log('Pre-rendered storefront: ' + home.length + ' characters');

  const descriptions = {
    privacy: 'Privacy policy: how Anshdeep Electronics handles site browsing, showroom enquiries and external services.',
    terms: 'Understand product guidance, illustration-only EMI calculations and showroom enquiries at Anshdeep Electronics.',
    accessibility: 'Accessibility guidance, keyboard support, mobile usability and help at Anshdeep Electronics.',
  };
  for (const slug of ['privacy', 'terms', 'accessibility']) {
    const policy = legalPages[slug];
    const markup = renderToString(createElement(LegalPage, { page: slug }));
    if (!markup.includes(policy.title) || !markup.includes('Call 99771 08780')) {
      throw new Error('Incomplete legal page ' + slug);
    }
    const url = origin + '/' + slug + '/';
    const title = policy.title + ' | Anshdeep Electronics';
    let html = template;
    html = html.replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>');
    html = html.replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + descriptions[slug] + '" />');
    html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + title + '" />');
    html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + descriptions[slug] + '" />');
    html = html.replace('<link rel="canonical" href="' + origin + '/" />','<link rel="canonical" href="' + url + '" />');
    html = html.replace('<meta property="og:url" content="' + origin + '/" />','<meta property="og:url" content="' + url + '" />');
    html = html.replace(/\s*<link rel="preload" href="\/editorial\/14512055.jpg"[^>]*>/, '');
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
    await mkdir('dist/' + slug, { recursive: true });
    await writeFile('dist/' + slug + '/index.html', inject(html,markup), 'utf8');
    console.log('Pre-rendered /' + slug + '/: ' + markup.length + ' characters');
  }
} finally {
  await vite.close();
}
