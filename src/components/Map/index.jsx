import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  Map,
  Marker,
  Polyline,
  Polygon,
  GoogleApiWrapper,
} from 'google-maps-react';
import dropIcon from '../../components/Icons/drop-icon.png';
import levelIcon from '../../components/Icons/level-icon.png';
import { useAppData } from '../../providers/AppDataProvider';
import config from '../../config';
import './styles.css';
import { HQOservation } from '../StationInfo/stationUtil';
import { useRasters } from '../../hooks/useRasters';
import { useMapPosition } from '../../hooks/useMapPosition';
import { useStationFilters } from '../../hooks/useStationFilters';
import { isNull } from 'lodash';
import {
  MarkerClusterer,
  // DefaultRenderer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { useBasinFilter } from '../../hooks/useBasinFilter';
import { useAccumulationData } from '../../hooks/useAccumulationData';
import { useLatestObservations } from '../../hooks/useLatestObservations';
import { useStreamFilter } from '../../hooks/useStreamFilter';
import { useNavigation } from '../../hooks/useNavigation';
import { useStreamLevel } from '../../hooks/useStreamLevel';
import { buildMapStyles, extractDefaultId } from './mapStyles';
import { useMapStyle } from '../../hooks/useMapStyle';

const MapContainer = ({ google }) => {
  const {
    renderRasterV2,
    // renderLimits
  } = useRasters();
  const { accumulationData } = useAccumulationData();
  const { flowObservations, levelObservations } = useLatestObservations();
  const { streamLevelData } = useStreamLevel();

  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
    hideEmptyStations,
  } = useStationFilters();
  const {
    mapPosition,
    initialZoom,
    initialCenter,
    updateZoomAndCenter,
  } = useMapPosition();
  const { shouldHideBasin } = useBasinFilter();
  const { shouldHideStream } = useStreamFilter();
  const { streams, basins, stations } = useAppData();
  const weatherStations = useMemo(() => {
    return stations.filter((s) => {
      const rainOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === 3
      ); // rain
      return rainOrigins.length > 0;
    });
  }, [stations]);
  const hydroMetricStations = useMemo(() => {
    return stations.filter((s) => {
      const levelOrigins = s.stationDataOriginList.filter(
        (o) => o.dimension.id === 1
      ); // level
      return levelOrigins.length > 0;
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

  const { goToStationDetails } = useNavigation();
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

  const renderHydroMetricStations = () => {
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
  };

  const renderStreams = useCallback(() => {
    if (!showStreams) {
      return;
    }
    return streams.map(({ streamName, streamPaths }) => {
      if (shouldHideStream(streamName)) {
        return null;
      }
      const found = streamLevelData.find((x) => x.streamName === streamName);
      let streamColor = '#666';
      if (found) {
        const { streamLevel } = found;
        if (streamLevel < 0.5) streamColor = '#31859c';
        if (streamLevel >= 0.5 && streamLevel < 1) streamColor = '#f3d41a';
        if (streamLevel >= 1 && streamLevel < 2) streamColor = '#e36d25';
        if (streamLevel >= 2) streamColor = '#ff0000';
      }
      return streamPaths.map((streamPath, i) => {
        return (
          <Polyline
            key={`${streamName}_${i}`}
            path={streamPath}
            strokeColor={streamColor}
            strokeOpacity={1}
            strokeWeight={2}
          />
        );
      });
    });
  }, [shouldHideStream, showStreams, streamLevelData, streams]);

  const renderBasins = () => {
    if (!showBasins) {
      return;
    }
    return basins.map((basin) => {
      const { id, color, path } = basin;
      if (shouldHideBasin(id)) {
        return null;
      }
      return (
        <Polygon
          key={id}
          paths={path.map((point) => ({
            lng: Number.parseFloat(point.lng),
            lat: Number.parseFloat(point.lat),
          }))}
          strokeColor="#666"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor={color}
          fillOpacity={0.2}
        />
      );
    });
  };

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

  const { updateMapStyles, selectedStyle, mapStyles } = useMapStyle();

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
  }, [mapReady, mapRef, updateMapStyles]);

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
