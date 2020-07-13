const initialState = {
  showHydroMetricStations: true,
  showWeatherStations: true,
  showStreams: true,
  showBasins: true,
};

const MAP_FILTER_TOGGLE_HYDRO_METRIC_STATIONS =
  'MAP_FILTER_TOGGLE_HYDRO_METRIC_STATIONS';
const MAP_FILTER_TOGGLE_WEATHER_STATIONS = 'MAP_FILTER_TOGGLE_WEATHER_STATIONS';
const MAP_FILTER_TOGGLE_STREAMS = 'MAP_FILTER_TOGGLE_STREAMS';
const MAP_FILTER_TOGGLE_BASINS = 'MAP_FILTER_TOGGLE_BASINS';

const toggleHydroMetricStations = () => {
  return {
    type: MAP_FILTER_TOGGLE_HYDRO_METRIC_STATIONS,
  };
};

const toggleWeatherStations = () => {
  return {
    type: MAP_FILTER_TOGGLE_WEATHER_STATIONS,
  };
};

const toggleStreams = () => {
  return {
    type: MAP_FILTER_TOGGLE_STREAMS,
  };
};

const toggleBasins = () => {
  return {
    type: MAP_FILTER_TOGGLE_BASINS,
  };
};

export const mapFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_FILTER_TOGGLE_HYDRO_METRIC_STATIONS:
      return {
        ...state,
        showHydroMetricStations: !state.showHydroMetricStations,
      };
    case MAP_FILTER_TOGGLE_WEATHER_STATIONS:
      return {
        ...state,
        showWeatherStations: !state.showWeatherStations,
      };
    case MAP_FILTER_TOGGLE_STREAMS:
      return {
        ...state,
        showStreams: !state.showStreams,
      };
    case MAP_FILTER_TOGGLE_BASINS:
      return {
        ...state,
        showBasins: !state.showBasins,
      };
    default:
      return { ...state };
  }
};

export const mapFilterActions = {
  toggleHydroMetricStations,
  toggleWeatherStations,
  toggleStreams,
  toggleBasins,
};
