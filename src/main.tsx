import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from './store';
import { SnackbarProvider } from 'notistack';
import initServiceInterceptors from './services';
import config from './config';

if (import.meta.env.MODE === 'development' && config.serviceInterceptors) {
  initServiceInterceptors();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StoreProvider>
  </StrictMode>
);
