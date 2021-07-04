import React, { useContext } from 'react';
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

const MapContainer = ({ google }) => {
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

  return (
    <div>
      <Map
        google={google}
        zoom={8}
        containerStyle={{
          width: '95%',
          height: '90%',
        }}
        initialCenter={{ lat: -25.6558152, lng: -65.5006693 }}
      >
        {renderHydroMetricStations()}
        {renderWeatherStations()}
        {renderStreams()}
        {renderBasins()}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: config.maps.key,
})(MapContainer);
