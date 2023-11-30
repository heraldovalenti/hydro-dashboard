import { useSelector } from 'react-redux';

export const useStationFilters = () => {
  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
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
    };
  });

  return {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
  };
};
