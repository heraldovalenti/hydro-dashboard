import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './store';
import { SnackbarProvider } from 'notistack';
import initServiceInterceptors from './services';
import config from './config';

if (process.env.REACT_APP_ENV === 'development' && config.serviceInterceptors) {
  initServiceInterceptors();
}

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
