import { useCallback } from 'react';
import { useMapPosition } from './useMapPosition';

export const useStationNavigation = () => {
  const { updateZoomAndCenter } = useMapPosition();
  const stationNavigation = useCallback(
    (station) => {
      const { latitude: lat, longitude: lng } = station;
      updateZoomAndCenter({
        center: {
          lat,
          lng,
        },
        zoom: 14,
      });
    },
    [updateZoomAndCenter]
  );
  return {
    stationNavigation,
  };
};
