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
import { StreamRepository } from '../../services/Streams';
import { BasinRepository } from '../../services/Basins';
const mapStyles = {
  width: '90%',
  height: '90%',
};
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    hydroMetricStations: [],

    showHydroMetricStations: true,
    weatherStations: [],
    showWeatherStations: true,
    showStreams: true,
    streams: [],
    showBasins: true,
    cabraCorralBasin: [],
    tunalBasin: [],
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const loadRepositories = async () => {
      const hydroMetricStations = await HydroMetricStationRepository.list();
      const weatherStations = await WeatherStationRepository.list();
      const streams = await StreamRepository.list();
      const cabraCorralBasin = await BasinRepository.cabraCorralBasin();
      const tunalBasin = await BasinRepository.tunalBasin();
      this.setState({
        ...this.state,
        weatherStations,
        hydroMetricStations,
        streams,
        cabraCorralBasin,
        tunalBasin,
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
    if (!this.state.showHydroMetricStations) {
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
    if (!this.state.showWeatherStations) {
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
    if (!this.state.showStreams) {
      return;
    }
    const streams = this.state.streams;
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
    const { showBasins, tunalBasin, cabraCorralBasin } = this.state;
    if (!showBasins) {
      return;
    }
    const basins = [
      // tunalBasin[0],
      // tunalBasin[1],
      // tunalBasin[2],
      // tunalBasin[3],
      // tunalBasin[4],
      // tunalBasin[5],
      ...tunalBasin,
      ...cabraCorralBasin,
    ];
    return basins.map((basin) => (
      <Polygon
        paths={basin}
        strokeColor="#FF0000"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#FF8800"
        fillOpacity={0.2}
      />
    ));
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: -24.7960685, lng: -65.5006693 }}
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
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCnILw5Ddl2uXfyvFgEtPHTw-su8JlQzA8',
})(MapContainer);
