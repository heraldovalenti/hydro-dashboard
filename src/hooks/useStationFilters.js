import { useSelector } from 'react-redux';
import { useLatestObservations } from './useLatestObservations';
import { useAccumulationData } from './useAccumulationData';
import { useMemo } from 'react';
import { useStreamLevel } from './useStreamLevel';

export const useStationFilters = () => {
  const { isLoading: isLoadingAccumulationData } = useAccumulationData();
  const { isLoading: isLoadingLatestObservations } = useLatestObservations();
  const { isLoading: isLoadingStreamLevel } = useStreamLevel();
  const isLoading = useMemo(
    () => isLoadingAccumulationData || isLoadingLatestObservations,
    [isLoadingAccumulationData, isLoadingLatestObservations]
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
    showStreams: !isLoadingStreamLevel && showStreams,
    showBasins,
    hideEmptyStations,
  };
};
