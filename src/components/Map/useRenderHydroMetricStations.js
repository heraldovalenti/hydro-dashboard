import { useEffect, useMemo } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import { useLatestObservations } from '../../hooks/useLatestObservations';
import { isNull } from 'lodash';
import { useOnStationClick } from './useOnStationClick';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { buildMarker } from './markerUtils';
import { isLevelDimension } from '../../utils/dimension';
import { HQOservation } from '../../utils/hqModel';

export const useRenderHydroMetricStations = () => {
  const { onStationClick } = useOnStationClick();
  const { showHydroMetricStations, hideEmptyStations } = useStationFilters();
  const { flowObservations, levelObservations } = useLatestObservations();

  const { stations } = useAppData();
  const hydroMetricStations = useMemo(() => {
    return stations.filter((s) => {
      const levelOrigins = s.stationDataOriginList.filter((o) =>
        isLevelDimension(o.dimension)
      );
      return levelOrigins.length > 0;
    });
  }, [stations]);

  const mapRef = useMap();
  const markerLib = useMapsLibrary('marker');

  useEffect(() => {
    if (!mapRef || !markerLib || !showHydroMetricStations) {
      return;
    }
    const markers = hydroMetricStations
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
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef,
          position: { lat: station.latitude, lng: station.longitude },
          title: station.description,
          content: buildMarker({
            description: hydrometric_data,
            type: 'level',
            severity: 'neutral',
          }),
          gmpClickable: true,
        });
        marker.addEventListener('gmp-click', () => onStationClick(station));
        return marker;
      })
      .filter((m) => !isNull(m));
    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [
    flowObservations,
    hideEmptyStations,
    hydroMetricStations,
    levelObservations,
    mapRef,
    markerLib,
    onStationClick,
    showHydroMetricStations,
  ]);

  return {};
};
