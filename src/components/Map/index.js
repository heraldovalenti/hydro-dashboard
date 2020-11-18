import React, { useState, useContext } from 'react';
import {
  Map,
  Marker,
  Polyline,
  Polygon,
  InfoWindow,
  GoogleApiWrapper,
} from 'google-maps-react';
import dropIcon from '../../components/Icons/drop-icon.png';
import levelIcon from '../../components/Icons/level-icon.png';
import { connect } from 'react-redux';
import { StoreContext } from '../../store';
import config from '../../config';
import StationInfo from './StationInfo';
import { fetchRainAccumulatedData } from '../../services/backend';

const MapContainer = ({
  showHydroMetricStations,
  showWeatherStations,
  showStreams,
  showBasins,
  hours,
  google,
}) => {
  const { streams, basins, stations } = useContext(StoreContext);
  const [state, setState] = useState({
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: null, //Shows the active marker upon click
    selectedStation: null, //Shows the infoWindow to the selected place upon a marker
  });
  const emptyStationData = {
    observationSeries: [],
    rainAccumulations: [],
  };
  const [stationData, setStationData] = useState(emptyStationData);

  const weatherStations = stations.filter((s) => {
    const rainOrigins = s.stationDataOriginList.filter(
      (o) => o.dimension.id === 3
    ); // lluvia
    return rainOrigins.length > 0;
  });
  const hydroMetricStations = stations.filter((s) => {
    const levelOrigins = s.stationDataOriginList.filter(
      (o) => o.dimension.id === 1
    ); // nivel
    return levelOrigins.length > 0;
  });

  const onClose = (_props) => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedStation: null,
      });
    }
  };

  const onMarkerClick = (props, marker, _e) => {
    const selectedStation = stations.filter((s) => s.id === props.stationId)[0];
    setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedStation,
    });
    // setStationData(emptyStationData);
    const fetchData = async () => {
      const fetchedData = await fetchRainAccumulatedData(
        selectedStation.id,
        hours
      );
      console.log(`fetchedData=${JSON.stringify(fetchedData)}`);
      setStationData(fetchedData);
    };
    fetchData();
  };

  const renderHydroMetricStations = () => {
    if (!showHydroMetricStations) {
      return;
    }
    return hydroMetricStations.map((station) => (
      <Marker
        position={{ lat: station.latitude, lng: station.longitude }}
        onClick={onMarkerClick}
        icon={levelIcon}
        stationId={station.id}
      />
    ));
  };

  const renderWeatherStations = () => {
    if (!showWeatherStations) {
      return;
    }
    return weatherStations.map((station) => (
      <Marker
        position={{ lat: station.latitude, lng: station.longitude }}
        onClick={onMarkerClick}
        icon={dropIcon}
        stationId={station.id}
      />
    ));
  };

  const renderStreams = () => {
    if (!showStreams) {
      return;
    }
    return streams.map((stream) => (
      <Polyline
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
    return basins.map((basin) => (
      <Polygon
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
    <Map
      google={google}
      zoom={8}
      style={{
        width: '90%',
        height: '90%',
      }}
      initialCenter={{ lat: -25.6558152, lng: -65.5006693 }}
    >
      {renderHydroMetricStations()}
      {renderWeatherStations()}
      {renderStreams()}
      {renderBasins()}
      <InfoWindow
        marker={state.activeMarker}
        visible={state.showingInfoWindow}
        onClose={onClose}
      >
        {state.showingInfoWindow && (
          <StationInfo
            station={state.selectedStation}
            hours={hours}
            stationData={stationData}
          />
        )}
      </InfoWindow>
    </Map>
  );
};

const mapStateToProps = (state) => {
  return {
    showHydroMetricStations: state.mapFilter.showHydroMetricStations,
    showWeatherStations: state.mapFilter.showWeatherStations,
    showStreams: state.mapFilter.showStreams,
    showBasins: state.mapFilter.showBasins,
    hours: state.intervalFilter.hours,
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: config.maps.key,
  })(MapContainer)
);
