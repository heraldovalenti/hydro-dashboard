import { useCallback } from 'react';
import { useMapPosition } from './useMapPosition';
import { useNavigation } from './useNavigation';

export const useStationFocus = () => {
  const { goToMap } = useNavigation();
  const { updateZoomAndCenter } = useMapPosition();
  const focusStation = useCallback(
    (station) => {
      const { latitude: lat, longitude: lng } = station;
      updateZoomAndCenter({
        center: {
          lat,
          lng,
        },
        zoom: 14,
      });
      goToMap();
    },
    [goToMap, updateZoomAndCenter]
  );
  return {
    focusStation,
  };
};
