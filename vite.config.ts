import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function preloadDisplayFont(): Plugin {
  return {
    name: 'preload-critical-display-font',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // The output bundle resolves the hashed local WOFF2 URL only in build.
        if (!ctx.bundle) return html;
        const asset = Object.keys(ctx.bundle).find(
          name => name.includes('space-grotesk-latin-wght-normal') && name.endsWith('.woff2')
        );
        if (!asset) return html;
        return {
          html,
          tags: [{
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: '/' + asset,
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
            },
            injectTo: 'head-prepend',
          }],
        };
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadDisplayFont()],
  server: { host: '127.0.0.1' },
  build: { target: 'es2022' },
});
