/**
 * Render the real storefront React tree to static HTML at build time.
 * The browser hydrates the exact same tree. No fake placeholders, external
 * SSR services, fragile browser botting, or SEO-only content duplication.
 */
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = 'dist/index.html';
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));
  if (!markup.includes('Good technology.') || !markup.includes('ANSHDEEP')) {
    throw new Error('Storefront pre-render is missing its essential visible content');
  }
  const html = await readFile(htmlPath, 'utf8');
  const target = '<div id="root"></div>';
  if (!html.includes(target)) throw new Error('Missing Vite root mount element');
  const rendered = html.replace(target, '<div id="root" data-prerendered="true">' + markup + '</div>');
  await writeFile(htmlPath, rendered, 'utf8');
  console.log('Pre-rendered storefront: ' + markup.length + ' characters of actual React content');
} finally {
  await vite.close();
}
