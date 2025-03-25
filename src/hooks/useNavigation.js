import { useNavigate } from 'react-router-dom';
import {
  ROUTE_MAP_PAGE,
  ROUTE_ROOT,
  ROUTE_STATION_INFO_PAGE,
  FORECAST_PAGE,
} from '../pages/Pages';
import { useCallback } from 'react';

export const useNavigation = () => {
  const navigate = useNavigate();

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
