import { useCallback, useMemo } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import { useLatestObservations } from '../../hooks/useLatestObservations';
import { Marker } from 'google-maps-react';
import { HQOservation } from '../StationInfo/stationUtil';
import { isNull } from 'lodash';
import levelIcon from '../../components/Icons/level-icon.png';
import { useOnMarkerClick } from './useOnMarkerClick';

export const useRenderHydroMetricStations = () => {
  const { onMarkerClick } = useOnMarkerClick();
  const { showHydroMetricStations, hideEmptyStations } = useStationFilters();
  const { flowObservations, levelObservations } = useLatestObservations();

  const { stations } = useAppData();
  const hydroMetricStations = useMemo(() => {
    return stations.filter((s) => {
      const levelOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === 1
      ); // level
      return levelOrigins.length > 0;
    });
  }, [stations]);

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
        const hydrometric_data = HQOservation({
          h: stationLevelObservations[0],
          q: stationFlowObservations[0],
        });
        if (!hydrometric_data && hideEmptyStations) {
          return null;
        }
        return (
          <Marker
            key={station.id}
            position={{ lat: station.latitude, lng: station.longitude }}
            onClick={() => onMarkerClick(station)}
            icon={levelIcon}
            stationId={station.id}
            label={
              hydrometric_data && {
                text: hydrometric_data,
                color: '#fafafa',
                className: 'hydrometric_data neutral',
              }
            }
          />
        );
      })
      .filter((m) => !isNull(m));
  }, [
    flowObservations,
    hideEmptyStations,
    hydroMetricStations,
    levelObservations,
    onMarkerClick,
    showHydroMetricStations,
  ]);

  return {
    renderHydroMetricStations,
  };
};
