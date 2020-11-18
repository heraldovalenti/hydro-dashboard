import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import './i18n';
import './App.css';
import Header from './sections/Header';
import SlideDrawer from './components/slidedrawer/SlideDrawer';
import Controls from './sections/Controls';
import Visualizations from './sections/Visualizations';
import EmptyState from './sections/EmptyState';
import SimulationIcon from './components/Icons/Simulation';
import Logo from './components/Icons/Logo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import COLORS from './types/colors';
import { StoreContext } from './store';
import spinner from './spinner.gif';
import Highcharts from 'highcharts';
import { useTranslation } from 'react-i18next';

library.add(fas);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const { loading } = useContext(StoreContext);

  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
    },
    palette: {
      primary: {
        main: COLORS.ORANGE.BASE,
      },
    },
  });
  const showEmptyState = loading;

  useEffect(() => {
    Highcharts.charts.forEach((chart) => chart && chart.reflow());
  }, [drawerOpen]);
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {loading && (
          <EmptyState title={''} subtitle={''} icon={t('loading_icon_label')} />
        )}
        {showEmptyState && (
          <EmptyState
            title={t('page_loading_no_data_title')}
            subtitle={t('page_loading_no_data_subtitle')}
            icon={<SimulationIcon />}
          />
        )}
        {!loading && !showEmptyState && (
          <div
            className={classNames({ AppOpen: drawerOpen, App: !drawerOpen })}
          >
            <SlideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
              <Controls />
            </SlideDrawer>
            <Header
              title={<Logo height={50} width={100} />}
              subtitle={t('page_header_text')}
            />
            <Visualizations />
          </div>
        )}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
