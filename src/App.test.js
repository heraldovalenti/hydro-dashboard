import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import StoreProvider from './store';
import { SnackbarProvider } from 'notistack';

test('renders app loading', () => {
  const { getByAltText } = render(
    <StoreProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StoreProvider>
  );
  const text = getByAltText('Spinner');
  expect(text).toBeInTheDocument();
});
