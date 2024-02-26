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
import { useSelector } from 'react-redux';
import { useAppData } from '../../providers/AppDataProvider';
import { useHistory } from 'react-router-dom';
import config from '../../config';
import './styles.css';
import { ROUTE_STATION_INFO_PAGE } from '../../pages/Routes';
import {
  flowDimension,
  HQOservation,
  levelDimension,
} from '../StationInfo/stationUtil';
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

const MapContainer = ({ google }) => {
  const {
    renderRaster,
    // renderLimits
  } = useRasters();
  const { accumulationData, latestObservations } = useSelector((state) => {
    return {
      accumulationData: state.accumulationData.accumulationData,
      latestObservations: state.latestObservations.latestObservations,
    };
  });
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
  const { streams, basins, stations } = useAppData();
  const history = useHistory();
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
      const stationAccumulations = accumulationData.filter(
        (stationAccumulation) => stationAccumulation.stationId === stationId
      );
      let accumulation = undefined;
      if (
        stationAccumulations[0] &&
        stationAccumulations[0].rainAccumulationList[0]
      ) {
        accumulation =
          stationAccumulations[0].rainAccumulationList[0].accumulation;
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

  const onMarkerClick = useCallback(
    (stationId) => {
      const location = {
        pathname: `${ROUTE_STATION_INFO_PAGE}/${stationId}`,
      };
      updateZoomAndCenter({
        zoom: mapPosition.zoom,
        center: mapPosition.center,
      });
      history.push(location);
    },
    [history, mapPosition.center, mapPosition.zoom, updateZoomAndCenter]
  );

  const renderHydroMetricStations = () => {
    if (!showHydroMetricStations) {
      return;
    }
    return hydroMetricStations
      .map((station) => {
        const levelObservations = latestObservations[levelDimension].filter(
          (o) => o.station.id === station.id
        );
        const flowObservations = latestObservations[flowDimension].filter(
          (o) => o.station.id === station.id
        );
        const hydrometric_data = HQOservation({
          h: levelObservations[0],
          q: flowObservations[0],
        });
        if (!hydrometric_data && hideEmptyStations) {
          return null;
        }
        return (
          <Marker
            key={station.id}
            position={{ lat: station.latitude, lng: station.longitude }}
            onClick={() => onMarkerClick(station.id)}
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

  const renderStreams = () => {
    if (!showStreams) {
      return;
    }
    return streams.map((stream, i) => (
      <Polyline
        key={i}
        path={stream}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    ));
  };

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
        marker.addListener('click', () => onMarkerClick(id));
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
        {renderRaster()}
      </Map>
    </div>
  );
};

export const MapComponent = GoogleApiWrapper({
  apiKey: config.maps.key,
  libraries: ['places', 'visualization'],
})(MapContainer);
