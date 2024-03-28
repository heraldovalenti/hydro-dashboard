import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './i18n';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import COLORS from './types/colors';
import AuthProvider from './providers/AuthProvider';
import AuthChecker from './layouts/AuthChecker';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  const theme = createMuiTheme({
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider>
            <AuthChecker />
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
