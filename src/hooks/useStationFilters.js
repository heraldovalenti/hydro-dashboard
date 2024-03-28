import { useSelector } from 'react-redux';
import { useLatestObservations } from './useLatestObservations';
import { useAccumulationData } from './useAccumulationData';
import { useMemo } from 'react';

export const useStationFilters = () => {
  const { isLoading: isAccumulationDataLoading } = useAccumulationData();
  const { isLoading: isLatestObservationsLoading } = useLatestObservations();
  const isLoading = useMemo(
    () => isAccumulationDataLoading || isLatestObservationsLoading,
    [isAccumulationDataLoading, isLatestObservationsLoading]
  );
  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
    hideEmptyStations,
  } = useSelector((state) => {
    return {
      showHydroMetricStations: state.mapFilter.showHydroMetricStations,
      showWeatherStations: state.mapFilter.showWeatherStations,
      showStreams: state.mapFilter.showStreams,
      showBasins: state.mapFilter.showBasins,
      hideEmptyStations: state.mapFilter.hideEmptyStations,
    };
  });

  return {
    showHydroMetricStations: !isLoading && showHydroMetricStations,
    showWeatherStations: !isLoading && showWeatherStations,
    showStreams,
    showBasins,
    hideEmptyStations,
  };
};
