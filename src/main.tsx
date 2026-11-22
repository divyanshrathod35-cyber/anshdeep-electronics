import React from 'react';
import '@fontsource-variable/dm-sans/latin-wght.css';
import '@fontsource-variable/space-grotesk/latin-wght.css';
import '@fontsource-variable/jetbrains-mono/latin-wght.css';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><App /></React.StrictMode>;
// Build output is statically rendered for real first paint + SEO.
// Vite development still mounts normally without a separate SSR process.
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
