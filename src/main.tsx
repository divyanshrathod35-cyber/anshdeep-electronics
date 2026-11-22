import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { LegalPage, type LegalRoute } from './LegalPage';
import './styles.css';

const root = document.getElementById('root')!;
const route = window.location.pathname.replace(/\/+$/, '').slice(1);
const legalRoute: LegalRoute | null = route === 'privacy' || route === 'terms' || route === 'accessibility' ? route : null;
const app = <React.StrictMode>{legalRoute ? <LegalPage page={legalRoute} /> : <App />}</React.StrictMode>;
// Build output is statically rendered for real first paint + SEO.
// Vite development still mounts normally without a separate SSR process.
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
