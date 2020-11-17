import React, { Component } from 'react';
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
import { HydroMetricStationRepository } from '../../services/HydroMetricStations';
import { WeatherStationRepository } from '../../services/WeatherStations';
import { LatestData as latestDataAES } from '../../services/LatestData';
import { LatestData as latestDataWundermap } from '../../services/Wundermap';
import { latestDataForName } from './support';
import { connect } from 'react-redux';
import { getAesTimeString } from '../../utils/date';
import { StoreContext } from '../../store';
import config from '../../config';

const mapStyles = {
  width: '90%',
  height: '90%',
};

export class MapContainer extends Component {
  static contextType = StoreContext;

  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker

    hydroMetricStations: [],
    weatherStations: [],
  };

  componentDidMount() {
    const loadRepositories = async () => {
      const hydroMetricStations = await HydroMetricStationRepository.list();
      const weatherStations = await WeatherStationRepository.list();
      const AESData = await latestDataAES.list();
      const wundermapData = await latestDataWundermap.list();
      const latestData = [...AESData, ...wundermapData];
      this.setState({
        ...this.state,
        weatherStations,
        hydroMetricStations,
        latestData,
      });
    };
    loadRepositories();
  }

  onClose = (_props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onMarkerClick = (props, marker, _e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  renderHydroMetricStations = () => {
    if (!this.props.showHydroMetricStations) {
      return;
    }
    const stations = this.state.hydroMetricStations;
    return stations.map((station) => (
      <Marker
        onClick={this.onMarkerClick}
        name={station.name}
        position={station.position}
        icon={levelIcon}
      />
    ));
  };

  renderWeatherStations = () => {
    if (!this.props.showWeatherStations) {
      return;
    }
    const stations = this.state.weatherStations;
    return stations.map((station) => (
      <Marker
        onClick={this.onMarkerClick}
        name={station.name}
        position={station.position}
        icon={dropIcon}
      />
    ));
  };

  renderStreams = () => {
    if (!this.props.showStreams) {
      return;
    }
    const streams = this.context.streams;
    return streams.map((stream) => (
      <Polyline
        path={stream}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    ));
  };

  renderBasins = () => {
    if (!this.props.showBasins) {
      return;
    }
    const { basins } = this.context;
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

  renderLatestData = (name) => {
    if (!name) return <div />;
    // if (name === 'AES - Cachi') {
    //   return (
    //     <ul>
    //       <li>13/09/2020 21:00 8 mm (8 mm)</li>
    //       <li>14/09/2020 00:00 10 mm (18 mm)</li>
    //       <li>14/09/2020 03:00 12 mm (30 mm)</li>
    //       <li>14/09/2020 06:00 11 mm (41 mm)</li>
    //       <li>14/09/2020 09:00 20 mm (61 mm)</li>
    //     </ul>
    //   );
    // }
    const data = latestDataForName(name, this.state.latestData);
    if (!data || !data[0]) return <div />;
    const renderData = data.map((entry) => {
      const { dimension, unit } = entry;
      const value = parseFloat(entry.value).toFixed(2);
      const date = getAesTimeString(entry.date);
      return {
        dimension,
        value,
        unit,
        date,
      };
    });
    return (
      <ul>
        {renderData.map((entry) => (
          <li>
            {entry.dimension}: {entry.value} {entry.unit} ({entry.date})
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: -25.6558152, lng: -65.5006693 }}
      >
        {this.renderHydroMetricStations()}
        {this.renderWeatherStations()}
        {this.renderStreams()}
        {this.renderBasins()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            {this.renderLatestData(this.state.selectedPlace.name)}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showHydroMetricStations: state.mapFilter.showHydroMetricStations,
    showWeatherStations: state.mapFilter.showWeatherStations,
    showStreams: state.mapFilter.showStreams,
    showBasins: state.mapFilter.showBasins,
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: config.maps.key,
  })(MapContainer)
);
