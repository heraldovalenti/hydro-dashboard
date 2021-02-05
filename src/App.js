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

library.add(fas);

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
    },
    palette: {
      primary: {
        main: COLORS.TURQUOISE.BASE,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AuthProvider>
          <AuthChecker />
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
