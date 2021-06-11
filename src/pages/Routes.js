import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Map from './Map';
import StationInfo from './StationInfo';

export const ROUTE_ROOT = `/`;
export const ROUTE_MAP_PAGE = `/map`;
export const ROUTE_STATION_INFO_PAGE = `/stationInfo`;

export default () => {
  return (
    <Router>
      <Switch>
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
