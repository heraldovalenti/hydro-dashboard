import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Map from './Map';
import StationInfo from './StationInfo';
import Forecast from './Forecast';
import { AppConfigPage } from './AesConfigPage';
import { StationList } from './StationList';

export const ROUTE_ROOT = '/';
export const ROUTE_MAP_PAGE = '/map';
export const ROUTE_STATION_INFO_PAGE = '/stationInfo';
export const FORECAST_PAGE = '/forecast';
export const AES_PAGE = '/aes';
export const STATION_LIST_PAGE = '/stations';

export default () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={AES_PAGE} element={<AppConfigPage />} />
        <Route path={STATION_LIST_PAGE} element={<StationList />} />
        <Route path={FORECAST_PAGE} element={<Forecast />} />
        <Route
          path={`${ROUTE_STATION_INFO_PAGE}/:id`}
          element={<StationInfo />}
        />
        <Route path={ROUTE_MAP_PAGE} element={<Map />} />
        <Route path={ROUTE_ROOT} element={<Navigate to={ROUTE_MAP_PAGE} />} />
      </Routes>
    </HashRouter>
  );
};
