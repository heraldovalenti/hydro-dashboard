import { useCallback, useMemo } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import { useLatestObservations } from '../../hooks/useLatestObservations';
import { isNull } from 'lodash';
import { useOnMarkerClick } from './useOnMarkerClick';
import config from '../../config';
import { Marker } from './Marker';

export const useRenderHydroMetricStations = () => {
  const { onMarkerClick } = useOnMarkerClick();
  const { showHydroMetricStations } = useStationFilters();
  const { flowObservations, levelObservations } = useLatestObservations();

  const { stations } = useAppData();
  const { levelId } = useMemo(() => config.constants.dimensions, []);
  const hydroMetricStations = useMemo(() => {
    return stations.filter((s) => {
      const levelOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === levelId
      );
      return levelOrigins.length > 0;
    });
  }, [levelId, stations]);

  const renderHydroMetricStations = useCallback(() => {
    if (!showHydroMetricStations) {
      return;
    }
    return hydroMetricStations
      .map((station) => {
        const stationLevelObservations = levelObservations.filter(
          (o) => o.station.id === station.id
        );
        const stationFlowObservations = flowObservations.filter(
          (o) => o.station.id === station.id
        );
        return (
          <Marker
            key={station.id}
            level={stationLevelObservations[0]}
            flow={stationFlowObservations[0]}
            position={{ lat: station.latitude, lng: station.longitude }}
            onClick={() => onMarkerClick(station)}
          />
        );
      })
      .filter((m) => !isNull(m));
  }, [
    flowObservations,
    hydroMetricStations,
    levelObservations,
    onMarkerClick,
    showHydroMetricStations,
  ]);

  return {
    renderHydroMetricStations,
  };
};
