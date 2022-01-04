import React, { useContext, useRef } from 'react';
import {
  Map,
  Marker,
  Polyline,
  Polygon,
  GoogleApiWrapper,
  HeatMap,
  Circle,
  Rectangle,
} from 'google-maps-react';
import dropIcon from '../../components/Icons/drop-icon.png';
import levelIcon from '../../components/Icons/level-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDataContext } from '../../providers/AppDataProvider';
import { useHistory } from 'react-router-dom';
import config from '../../config';
import './styles.css';
import { ROUTE_STATION_INFO_PAGE } from '../../pages/Routes';
import {
  flowDimension,
  HQOservation,
  levelDimension,
} from '../StationInfo/stationUtil';
import { updateZoomAndCenterAction } from '../../reducers/mapPosition';
import { useRaster } from '../../contexts/Raster';

const MapContainer = ({ google }) => {
  const { showRaster, selectedRaster } = useRaster();
  const dispatch = useDispatch();
  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
    accumulationData,
    latestObservations,
  } = useSelector((state) => {
    const accumulationLoading = state.accumulationData.loading;
    const latestObservationsLoading = state.latestObservations.loading;
    const loading = accumulationLoading || latestObservationsLoading;
    return {
      showHydroMetricStations:
        !loading && state.mapFilter.showHydroMetricStations,
      showWeatherStations: !loading && state.mapFilter.showWeatherStations,
      showStreams: state.mapFilter.showStreams,
      showBasins: state.mapFilter.showBasins,
      accumulationData: state.accumulationData.accumulationData,
      latestObservations: state.latestObservations.latestObservations,
    };
  });
  const { zoom: initialZoom, center: initialCenter } = useSelector(
    (state) => state.mapPosition
  );
  const mapPosition = useRef({ zoom: initialZoom, center: initialCenter })
    .current;
  const { streams, basins, stations } = useContext(AppDataContext);
  const history = useHistory();
  const weatherStations = stations.filter((s) => {
    const rainOrigins = s.stationDataOriginList.filter(
      (o) => o.dimension.id === 3
    ); // rain
    return rainOrigins.length > 0;
  });
  const hydroMetricStations = stations.filter((s) => {
    const levelOrigins = s.stationDataOriginList.filter(
      (o) => o.dimension.id === 1
    ); // level
    return levelOrigins.length > 0;
  });

  const onMarkerClick = ({ stationId }, _marker, _e) => {
    const selectedStation = stations.filter((s) => s.id === stationId)[0];
    const location = {
      pathname: `${ROUTE_STATION_INFO_PAGE}/${selectedStation.id}`,
    };
    dispatch(
      updateZoomAndCenterAction({
        zoom: mapPosition.zoom,
        center: mapPosition.center,
      })
    );
    history.push(location);
  };

  const renderHydroMetricStations = () => {
    if (!showHydroMetricStations) {
      return;
    }
    return hydroMetricStations.map((station) => {
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
      return (
        <Marker
          key={station.id}
          position={{ lat: station.latitude, lng: station.longitude }}
          onClick={onMarkerClick}
          icon={levelIcon}
          stationId={station.id}
          label={
            hydrometric_data && {
              text: hydrometric_data,
              color: '#fafafa',
              className: `hydrometric_data neutral`,
            }
          }
        />
      );
    });
  };

  const renderWeatherStations = () => {
    if (!showWeatherStations) {
      return;
    }
    return weatherStations.map((station) => {
      const stationAccumulations = accumulationData.filter(
        (stationAccumulation) => stationAccumulation.stationId === station.id
      );
      let accumulation = undefined;
      if (
        stationAccumulations[0] &&
        stationAccumulations[0].rainAccumulationList[0]
      ) {
        const value =
          stationAccumulations[0].rainAccumulationList[0].accumulation;
        accumulation = `${value.toFixed(0)}`;
      }
      let severity = 'low';
      if (accumulation > 10) severity = 'medium';
      if (accumulation > 30) severity = 'high';
      if (accumulation > 50) severity = 'danger';

      return (
        <Marker
          key={station.id}
          position={{ lat: station.latitude, lng: station.longitude }}
          onClick={onMarkerClick}
          icon={dropIcon}
          stationId={station.id}
          opacity={1}
          label={
            accumulation && {
              text: accumulation,
              color: '#fafafa',
              className: `accumulation_data ${severity}`,
            }
          }
        />
      );
    });
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
    return basins.map((basin, i) => (
      <Polygon
        key={i}
        paths={basin.data}
        strokeColor="#FF0000"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#FF8800"
        fillOpacity={0.2}
      />
    ));
  };
  const renderRaster = () => {
    if (!showRaster || !selectedRaster?.fileData) {
      return null;
    }
    const { Data = [] } = selectedRaster.fileData;
    const squareSize = 0.06;
    const init = { lng: -67.02585177951389, lat: -23.01110230836036 };
    // const min = floatArray.reduce(
    //   (min, x) => Math.min(min, x),
    //   Number.MAX_VALUE
    // );
    const max = Data.reduce((max, x) => Math.max(max, x), Number.MIN_VALUE);
    const points = Data.map((pointValue, index) => {
      const row = index / 60;
      const col = index % 60;
      const lat = init.lat - row * squareSize * 0.6;
      const lng = init.lng + col * squareSize;

      const p1 = { lat, lng };
      const p2 = { lat: lat + squareSize * 0.6, lng };
      const p3 = { lat, lng: lng + squareSize };
      const p4 = { lat: lat + squareSize * 0.6, lng: lng + squareSize };

      const normalValue = pointValue / max;
      const colorValue = normalValue * 4095;
      const color = parseInt(colorValue).toString(16).padStart(3, '0');
      const path = [p1, p2, p4, p3];
      return { path, color, weight: pointValue, lat, lng };
    });
    // const positions = points.map((x) => x.position);

    return (
      <HeatMap
        opacity={0.8}
        positions={points}
        radius={20}
        disipating={false}
      />
    );
    return points.map((point, i) => {
      return (
        <Polygon
          key={i}
          paths={point.path}
          // center={point.path[0]}
          // radius={2000}
          // bounds={{ north: p1, south: p2, east: p3, west: p4 }}
          strokeColor={`#${point.color}`}
          strokeOpacity={0.1}
          strokeWeight={0.1}
          fillColor={`#${point.color}`}
          fillOpacity={0.1}
        />
      );
    });
  };

  return (
    <div>
      <Map
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
        {/* {renderHydroMetricStations()} */}
        {/* {renderWeatherStations()} */}
        {/* {renderStreams()} */}
        {/* {renderBasins()} */}
        {renderRaster()}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: config.maps.key,
  libraries: ['places', 'visualization'],
})(MapContainer);
