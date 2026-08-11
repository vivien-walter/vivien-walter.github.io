import './index.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from '@/app/app';
import '@/app/i18n';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Impossible d’initialiser l’application : l’élément #root est introuvable.');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
