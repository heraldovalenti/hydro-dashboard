import { useSelector, useDispatch } from 'react-redux';
import { useLatestObservations } from './useLatestObservations';
import { useAccumulationData } from './useAccumulationData';
import { useCallback, useMemo } from 'react';
import { useStreamLevels } from './useStreamLevels';
import { mapFilterActions } from '../reducers/mapFilter';

export const useStationFilters = () => {
  const { isLoading: isLoadingAccumulationData } = useAccumulationData();
  const { isLoading: isLoadingLatestObservations } = useLatestObservations();
  const { isLoading: isLoadingStreamLevel } = useStreamLevels();
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
  } = useSelector((state) => state.mapFilter);
  const dispatch = useDispatch();
  const toggleBasins = useCallback(() => {
    dispatch(mapFilterActions.toggleBasins());
  }, [dispatch]);
  const toggleEmptyStationsStations = useCallback(
    () => dispatch(mapFilterActions.toggleEmptyStationsStations()),
    [dispatch]
  );
  const toggleHydroMetricStations = useCallback(
    () => dispatch(mapFilterActions.toggleHydroMetricStations()),
    [dispatch]
  );
  const toggleStreams = useCallback(
    () => dispatch(mapFilterActions.toggleStreams()),
    [dispatch]
  );
  const toggleWeatherStations = useCallback(
    () => dispatch(mapFilterActions.toggleWeatherStations()),
    [dispatch]
  );

  return {
    showHydroMetricStations: !isLoading && showHydroMetricStations,
    showWeatherStations: !isLoading && showWeatherStations,
    showStreams: !isLoadingStreamLevel && showStreams,
    showBasins,
    hideEmptyStations,
    toggleBasins,
    toggleEmptyStationsStations,
    toggleHydroMetricStations,
    toggleStreams,
    toggleWeatherStations,
  };
};
