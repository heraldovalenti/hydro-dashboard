import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Map from './Map';
import StationInfo from './StationInfo';

export const ROUTE_MAP_PAGE = '/';
export const ROUTE_STATION_INFO_PAGE = '/stationInfo';

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
      </Switch>
    </Router>
  );
};
