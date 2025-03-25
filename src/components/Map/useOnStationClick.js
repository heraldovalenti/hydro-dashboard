import { useCallback } from 'react';
import { useNavigation } from '../../hooks/useNavigation';

export const useOnStationClick = () => {
  const { goToStationDetails } = useNavigation();
  const onStationClick = useCallback(
    (station) => {
      goToStationDetails(station);
    },
    [goToStationDetails]
  );
  return {
    onStationClick,
  };
};
