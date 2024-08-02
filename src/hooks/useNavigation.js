import { useHistory } from 'react-router-dom';
import {
  ROUTE_MAP_PAGE,
  ROUTE_ROOT,
  ROUTE_STATION_INFO_PAGE,
  FORECAST_PAGE,
} from '../pages/Routes';
import { useCallback } from 'react';

export const useNavigation = () => {
  const history = useHistory();

  const navigate = useCallback((pathname) => history.push({ pathname }), [
    history,
  ]);

  const goToMain = useCallback(() => navigate(ROUTE_ROOT), [navigate]);

  const goToMap = useCallback(() => navigate(ROUTE_MAP_PAGE), [navigate]);

  const goToStationDetails = useCallback(
    (station) => navigate(`${ROUTE_STATION_INFO_PAGE}/${station.id}`),
    [navigate]
  );

  const goToForecast = useCallback(() => navigate(FORECAST_PAGE), [navigate]);

  return {
    goToMain,
    goToMap,
    goToStationDetails,
    goToForecast,
  };
};
