import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import dropIcon from '../../components/Icons/drop-icon.png';
import { useAppData } from '../../providers/AppDataProvider';
import config from '../../config';
import './styles.css';
import { useRasters } from '../../hooks/useRasters';
import { useMapPosition } from '../../hooks/useMapPosition';
import { useStationFilters } from '../../hooks/useStationFilters';
import {
  MarkerClusterer,
  // DefaultRenderer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { useAccumulationData } from '../../hooks/useAccumulationData';
import { buildMapStyles, extractDefaultId } from './mapStyles';
import { useMapStyle } from '../../hooks/useMapStyle';
import { useRenderStreams } from './useRenderStreams';
import { useRenderBasins } from './useRenderBasins';
import { useRenderHydroMetricStations } from './useRenderHydrometricStations';
import { useOnMarkerClick } from './useOnMarkerClick';

const MapContainer = ({ google }) => {
  const {
    renderRasterV2,
    // renderLimits
  } = useRasters();
  const { accumulationData } = useAccumulationData();

  const { showWeatherStations, hideEmptyStations } = useStationFilters();
  const { mapPosition, initialZoom, initialCenter } = useMapPosition();
  const { stations } = useAppData();
  const weatherStations = useMemo(() => {
    return stations.filter((s) => {
      const rainOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === 3
      ); // rain
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
      if (accumulation === undefined) {
        return {
          accumulation,
          label: accumulation,
        };
      }
      let severity = 'low';
      if (accumulation > 10) severity = 'medium';
      if (accumulation > 30) severity = 'high';
      if (accumulation > 50) severity = 'danger';

      const label = {
        text: `${accumulation.toFixed(0)}`,
        color: '#fafafa',
        className: `accumulation_data ${severity}`,
      };

      // const marker = stationMarkers.current.find((m) => m.stationId === id);
      // if (marker) {
      //   marker.setLabel(label);
      // }
      return {
        accumulation,
        label,
      };
    },
    [accumulationData]
  );

  const { onMarkerClick } = useOnMarkerClick();

  const { renderStreams } = useRenderStreams();
  const { renderBasins } = useRenderBasins();
  const { renderHydroMetricStations } = useRenderHydroMetricStations();

  const [mapReady, setMapReady] = useState(false);
  const [mapRef, setMapRef] = useState(null);

  const renderCluster = useCallback(
    ({
      // count,
      position,
      clusterStationIds,
    }) => {
      const clusterStationsAccumulations = clusterStationIds.map((id) =>
        accumulationForStation(id)
      );
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
          label: undefined,
          accumulation: undefined,
        }
      );
      // console.log('renderCluster()', {
      //   clusterStations: clusterStationIds,
      //   clusterStationsAccumulations,
      //   accumulationForCluster,
      // });

      // const color =
      //   count > 4 //Math.max(4, stats.clusters.markers.mean)
      //     ? '#ff0000'
      //     : '#0000ff';

      // create svg url with fill color
      //       const svg = window.btoa(`
      // <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      //   <circle cx="120" cy="120" opacity=".6" r="70" />
      //   <circle cx="120" cy="120" opacity=".3" r="90" />
      //   <circle cx="120" cy="120" opacity=".2" r="110" />
      //   <circle cx="120" cy="120" opacity=".1" r="130" />
      // </svg>`);

      // create marker using svg icon
      const clusterMarker = new google.maps.Marker({
        map: mapRef,
        position,
        icon: dropIcon,
        // icon: {
        //   url: `data:image/svg+xml;base64,${svg}`,
        //   scaledSize: new google.maps.Size(45, 45),
        // },
        label: accumulationForCluster.label,
        // label: {
        //   text: `${accumulationForCluster.accumulation || 0}`,
        //   color: 'rgba(255,255,255,0.9)',
        //   fontSize: '12px',
        // },
        // adjust zIndex to be above other markers
        // zIndex: 1000 + count,
      });
      return clusterMarker;
    },
    [accumulationForStation, google.maps.Marker, mapRef]
  );

  const stationMarkers = useRef([]);
  const markerCluster = useRef(null);
  useEffect(() => {
    if (!mapReady || !showWeatherStations) {
      return;
    }
    const markers = weatherStations
      .filter((station) => {
        const { accumulation } = accumulationForStation(station.id);
        return !(hideEmptyStations && accumulation === undefined);
      })
      .map((station) => {
        const { id, latitude, longitude } = station;

        const { label } = accumulationForStation(id);

        const marker = new google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude,
          },
          icon: dropIcon,
          map: mapRef,
          stationId: id,
          label,
        });
        marker.addListener('click', () => onMarkerClick(station));
        return marker;
      });
    stationMarkers.current = markers;
    if (markerCluster.current) {
      markerCluster.current.addMarkers(markers);
    }
    // console.log('weatherStations initialized');
    return () => {
      if (markerCluster.current) {
        markerCluster.current.clearMarkers();
      }
      markers.forEach((m) => m.setMap(null));
      stationMarkers.current = [];
      // console.log('weatherStations cleared');
    };
  }, [
    google.maps.Marker,
    mapReady,
    mapRef,
    onMarkerClick,
    showWeatherStations,
    hideEmptyStations,
    weatherStations,
    accumulationForStation,
  ]);

  useEffect(() => {
    if (!mapReady) {
      return;
    }
    const cluster = new MarkerClusterer({
      map: mapRef,
      markers: stationMarkers.current,
      renderer: {
        // render: new DefaultRenderer().render,
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
      // onClusterClick: (...args) => {
      //   console.log('onClusterClick()', { args });
      // },
    });
    // setMarkerCluster(cluster);
    markerCluster.current = cluster;
    // console.log('cluster initialized');
    return () => {
      markerCluster.current = null;
      // console.log('cluster cleared');
    };
  }, [mapReady, mapRef, renderCluster]);

  const { updateMapStyles, selectedStyle } = useMapStyle();

  useEffect(() => {
    if (!mapReady) {
      return;
    }
    const defaultId = extractDefaultId(mapRef);
    const mapStyles = buildMapStyles(google);
    mapStyles.forEach(({ id, style }) => mapRef.mapTypes.set(id, style));
    updateMapStyles([
      { id: defaultId, name: 'Natural' },
      ...mapStyles.map((mapStyle) => ({
        name: mapStyle.style.name,
        id: mapStyle.id,
      })),
    ]);
  }, [google, mapReady, mapRef, updateMapStyles]);

  useEffect(() => {
    if (!mapReady || !selectedStyle) {
      return;
    }
    mapRef.setMapTypeId(selectedStyle);
  }, [mapReady, mapRef, selectedStyle]);

  const onMapReady = useCallback((_mapProps, map) => {
    setMapRef(map);
    setMapReady(true);
  }, []);

  return (
    <div>
      <Map
        onReady={onMapReady}
        onZoomChanged={(_mapProps, map) => {
          mapPosition.zoom = map.zoom;
        }}
        onDragend={(_mapProps, map) => {
          mapPosition.center.lat = map.center.lat();
          mapPosition.center.lng = map.center.lng();
        }}
        google={google}
        zoom={initialZoom}
        containerStyle={{
          width: '95%',
          height: '90%',
        }}
        initialCenter={initialCenter}
      >
        {renderHydroMetricStations()}
        {renderStreams()}
        {renderBasins()}
        {renderRasterV2()}
      </Map>
    </div>
  );
};

export const MapComponent = GoogleApiWrapper({
  apiKey: config.maps.key,
  libraries: ['places', 'visualization'],
})(MapContainer);
