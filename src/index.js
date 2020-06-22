import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './store';
import { SnackbarProvider } from 'notistack';

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
