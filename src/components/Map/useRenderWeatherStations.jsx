import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import config from '../../config';
import { useAccumulationData } from '../../hooks/useAccumulationData';
import { useOnMarkerClick } from './useOnMarkerClick';
import { useMap } from '@vis.gl/react-google-maps';
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import dropIcon from '../../components/Icons/drop-icon.png';
import './styles.css';

export const useRenderWeatherStations = () => {
  const { onMarkerClick } = useOnMarkerClick();
  const { showWeatherStations, hideEmptyStations } = useStationFilters();
  const { stations } = useAppData();
  const { accumulationData } = useAccumulationData();
  const { rainId } = useMemo(() => config.constants.dimensions, []);
  const weatherStations = useMemo(() => {
    return stations.filter((s) => {
      const rainOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === rainId
      );
      return rainOrigins.length > 0;
    });
  }, [rainId, stations]);

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
    if (!accumulation) return undefined;
    let severity = 'low';
    if (accumulation > 10) severity = 'medium';
    if (accumulation > 30) severity = 'high';
    if (accumulation > 50) severity = 'danger';
    return {
      text: `${accumulation.toFixed(0)}`,
      color: '#fafafa',
      className: `accumulation_data ${severity}`,
    };
  }, []);

  const map = useMap();
  const stationMarkers = useRef([]);
  const markerCluster = useRef(null);

  // render weather stations
  useEffect(() => {
    if (!map) {
      return;
    }
    const markers = stationAccumulations.map(({ station, accumulation }) => {
      const { id, latitude, longitude } = station;
      const marker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        icon: dropIcon,
        map,
        stationId: id,
        label: labelForAccumulation(accumulation),
      });
      marker.addListener('click', () => onMarkerClick(station));
      return marker;
    });
    stationMarkers.current = markers;
    if (markerCluster.current) {
      markerCluster.current.addMarkers(markers);
    }
    return () => {
      if (markerCluster.current) {
        markerCluster.current.clearMarkers();
      }
      markers.forEach((m) => m.setMap(null));
      stationMarkers.current = [];
    };
  }, [
    onMarkerClick,
    showWeatherStations,
    hideEmptyStations,
    weatherStations,
    accumulationForStation,
    map,
    stationAccumulations,
    labelForAccumulation,
  ]);

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
      const clusterMarker = new google.maps.Marker({
        map,
        position,
        icon: dropIcon,
        label: labelForAccumulation(accumulationForCluster.accumulation),
      });
      return clusterMarker;
    },
    [labelForAccumulation, map, stationAccumulations]
  );

  // render clusterer
  useEffect(() => {
    if (!map) {
      return;
    }
    const cluster = new MarkerClusterer({
      map,
      markers: stationMarkers.current,
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
    markerCluster.current = cluster;
    return () => {
      markerCluster.current = null;
    };
  }, [map, renderCluster]);

  return {};
};
