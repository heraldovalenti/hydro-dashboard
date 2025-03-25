import { useCallback } from 'react';
import { useNavigation } from '../../hooks/useNavigation';

export const useOnMarkerClick = () => {
  const { goToStationDetails } = useNavigation();
  const onMarkerClick = useCallback(
    (station) => {
      goToStationDetails(station);
    },
    [goToStationDetails]
  );
  return {
    onMarkerClick,
  };
};
