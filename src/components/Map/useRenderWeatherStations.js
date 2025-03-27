import { useCallback, useMemo, useEffect } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import { useAccumulationData } from '../../hooks/useAccumulationData';
import { useOnStationClick } from './useOnStationClick';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { buildMarker } from './markerUtils';
import { isRainDimension } from '../../utils/dimension';

export const useRenderWeatherStations = () => {
  const { onStationClick } = useOnStationClick();
  const { showWeatherStations, hideEmptyStations } = useStationFilters();
  const { stations } = useAppData();
  const { accumulationData } = useAccumulationData();
  const weatherStations = useMemo(() => {
    return stations.filter((s) => {
      const rainOrigins = s.stationDataOriginList.filter((o) =>
        isRainDimension(o.dimension)
      );
      return rainOrigins.length > 0;
    });
  }, [stations]);

  const accumulationForStation = useCallback(
    (stationId) => {
      const stationAccumulations = accumulationData.find(
        (stationAccumulation) => stationAccumulation.stationId === stationId
      );
      let accumulation = undefined;
      if (stationAccumulations) {
        accumulation = stationAccumulations.accumulation || 0.0;
      }
      return accumulation;
    },
    [accumulationData]
  );

  const stationAccumulations = useMemo(() => {
    if (!showWeatherStations) {
      return [];
    }
    return weatherStations
      .map((station) => {
        const accumulation = accumulationForStation(station.id);
        return {
          station,
          accumulation,
        };
      })
      .filter(
        ({ accumulation }) => !(hideEmptyStations && accumulation === undefined)
      );
  }, [
    accumulationForStation,
    hideEmptyStations,
    showWeatherStations,
    weatherStations,
  ]);

  const labelForAccumulation = useCallback((accumulation) => {
    let description = '';
    if (accumulation !== undefined) {
      description = `${accumulation.toFixed(0)}`;
    }
    let severity = 'low';
    if (accumulation > 10) severity = 'medium';
    if (accumulation > 30) severity = 'high';
    if (accumulation > 50) severity = 'danger';
    return {
      description,
      severity,
    };
  }, []);

  const mapRef = useMap();
  const mapLib = useMapsLibrary('marker');

  const renderCluster = useCallback(
    (cluster) => {
      const {
        // count,
        position,
        clusterStationIds,
      } = cluster;
      const clusterStationsAccumulations = clusterStationIds.map((id) => {
        const found = stationAccumulations.find(({ station }) => {
          return station.id === id;
        });
        return found;
      });
      const accumulationForCluster = clusterStationsAccumulations.reduce(
        (result, afs) => {
          if (!result.accumulation) {
            return afs;
          } else if (afs.accumulation) {
            return result.accumulation > afs.accumulation ? result : afs;
          }
          return result;
        },
        {
          station: undefined,
          accumulation: undefined,
        }
      );
      const { description, severity } = labelForAccumulation(
        accumulationForCluster.accumulation
      );
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef,
        position,
        content: buildMarker({
          description,
          type: 'rain',
          severity,
        }),
      });
      return marker;
    },
    [labelForAccumulation, mapRef, stationAccumulations]
  );

  useEffect(() => {
    if (!mapRef || !mapLib) {
      return;
    }
    const markers = stationAccumulations.map(({ station, accumulation }) => {
      const { description, severity } = labelForAccumulation(accumulation);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef,
        position: {
          lat: station.latitude,
          lng: station.longitude,
        },
        title: station.description,
        content: buildMarker({
          description,
          type: 'rain',
          severity,
        }),
        gmpClickable: true,
      });
      marker.stationId = station.id;
      marker.addEventListener('gmp-click', () => onStationClick(station));
      return marker;
    });
    const cluster = new MarkerClusterer({
      map: mapRef,
      markers,
      renderer: {
        render: renderCluster,
      },
      algorithm: {
        calculate: (...args) => {
          const result = new SuperClusterAlgorithm({}).calculate(...args);
          const { clusters } = result;
          clusters.forEach((c) => {
            const clusterStationIds = c.markers.map((m) => m.stationId);
            c.clusterStationIds = clusterStationIds;
          });
          return result;
        },
      },
    });

    return () => {
      markers.forEach((m) => m.setMap(null));
      cluster.clearMarkers();
      cluster.setMap(null);
    };
  }, [
    showWeatherStations,
    hideEmptyStations,
    weatherStations,
    accumulationForStation,
    mapRef,
    stationAccumulations,
    labelForAccumulation,
    renderCluster,
    mapLib,
    onStationClick,
  ]);

  return {};
};
