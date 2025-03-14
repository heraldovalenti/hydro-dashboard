import { useCallback } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useMapPosition } from '../../hooks/useMapPosition';

export const useOnMarkerClick = () => {
  const { goToStationDetails } = useNavigation();
  const { mapPosition, updateZoomAndCenter } = useMapPosition();
  const onMarkerClick = useCallback(
    (station) => {
      goToStationDetails(station);
      updateZoomAndCenter({
        zoom: mapPosition.zoom,
        center: mapPosition.center,
      });
    },
    [
      goToStationDetails,
      mapPosition.center,
      mapPosition.zoom,
      updateZoomAndCenter,
    ]
  );
  return {
    onMarkerClick,
  };
};
