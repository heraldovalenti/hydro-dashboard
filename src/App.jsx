import React from 'react';
import './i18n';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import COLORS from './types/colors';
import AuthProvider from './providers/AuthProvider';
import AuthChecker from './layouts/AuthChecker';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

library.add(fas);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60_000,
      staleTime: 60_000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
    },
    palette: {
      primary: {
        main: COLORS.TURQUOISE.BASE,
        background: COLORS.LIGHT_BLUE.BASE,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <AuthProvider>
              <AuthChecker />
            </AuthProvider>
          </LocalizationProvider>
        </StylesThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
