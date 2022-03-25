import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Map from './Map';
import StationInfo from './StationInfo';
import Forecast from './Forecast';
import { AppConfigPage } from './AesConfigPage';

export const ROUTE_ROOT = `/`;
export const ROUTE_MAP_PAGE = `/map`;
export const ROUTE_STATION_INFO_PAGE = `/stationInfo`;
export const FORECAST_PAGE = `/forecast`;
export const AES_PAGE = `/aes`;

export default () => {
  return (
    <Router>
      <Switch>
        <Route path={AES_PAGE}>
          <AppConfigPage />
        </Route>
        <Route path={FORECAST_PAGE}>
          <Forecast />
        </Route>
        <Route path={`${ROUTE_STATION_INFO_PAGE}/:id`}>
          <StationInfo />
        </Route>
        <Route path={ROUTE_MAP_PAGE}>
          <Map />
        </Route>
        <Route path={ROUTE_ROOT}>
          <Redirect to={ROUTE_MAP_PAGE} />
        </Route>
      </Switch>
    </Router>
  );
};
