import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><App /></React.StrictMode>;
// Build output is statically rendered for real first paint + SEO.
// Vite development still mounts normally without a separate SSR process.
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
