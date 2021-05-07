import React, { useState, useContext, useEffect } from 'react';
import {
  Map,
  Marker,
  Polyline,
  Polygon,
  GoogleApiWrapper,
} from 'google-maps-react';
import dropIcon from '../../components/Icons/drop-icon.png';
import levelIcon from '../../components/Icons/level-icon.png';
import { connect } from 'react-redux';
import { AppDataContext } from '../../providers/AppDataProvider';
import config from '../../config';
import StationInfo from './StationInfo';
import { fetchAccumulationData } from '../../services/backend';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflowY: 'scroll',
  },
}));

const MapContainer = ({
  showHydroMetricStations,
  showWeatherStations,
  showStreams,
  showBasins,
  hours,
  dateTo,
  dateFrom,
  google,
}) => {
  const { streams, basins, stations } = useContext(AppDataContext);
  const [state, setState] = useState({
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: null, //Shows the active marker upon click
    selectedStation: null, //Shows the infoWindow to the selected place upon a marker
    accumulation: undefined,
  });
  const [accumulationData, setAccumulationData] = useState([]);
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

  const onClose = (_props) => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedStation: null,
        accumulation: undefined,
      });
    }
  };

  const onMarkerClick = ({ stationId, accumulation }, marker, _e) => {
    const selectedStation = stations.filter((s) => s.id === stationId)[0];
    setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedStation,
      accumulation,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const accumulationDataAux = await fetchAccumulationData(dateFrom, dateTo);
      setAccumulationData(accumulationDataAux);
    };
    fetchData();
  }, [hours, dateFrom, dateTo]);

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
          accumulation={accumulation}
        />
      );
    });
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

  const classes = useStyles();

  return (
    <div>
      <Modal open={state.showingInfoWindow} onClose={onClose}>
        <div className={classes.modal}>
          <StationInfo
            station={state.selectedStation}
            dateFrom={dateFrom}
            dateTo={dateTo}
            accumulation={state.accumulation}
            closeAction={onClose}
          />
        </div>
      </Modal>
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

const mapStateToProps = (state) => {
  return {
    showHydroMetricStations: state.mapFilter.showHydroMetricStations,
    showWeatherStations: state.mapFilter.showWeatherStations,
    showStreams: state.mapFilter.showStreams,
    showBasins: state.mapFilter.showBasins,
    hours: state.intervalFilter.hours,
    dateTo: state.intervalFilter.dateTo,
    dateFrom: state.intervalFilter.dateFrom,
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: config.maps.key,
  })(MapContainer)
);
