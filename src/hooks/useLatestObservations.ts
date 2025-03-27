import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { fetchLatestbservations } from '../services/backend';
import { useDateInterval } from './useDateInterval';
import { Observation } from '../model';
import { FLOW_DIMENSION_ID, LEVEL_DIMENSION_ID } from '../utils/dimension';

export const useLatestObservations = () => {
  const { from, to } = useDateInterval();
  const { data, isLoading } = useQuery(
    [queryKeys.LATEST_OBSERVATIONS, from, to],
    async () => {
      const [levelObservations, flowObservations] = await Promise.all([
        fetchLatestbservations(LEVEL_DIMENSION_ID, from, to),
        fetchLatestbservations(FLOW_DIMENSION_ID, from, to),
      ]);
      return { levelObservations, flowObservations };
    }
  );
  const levelObservations: Observation[] = useMemo(
    () => data?.levelObservations || [],
    [data]
  );
  const flowObservations: Observation[] = useMemo(
    () => data?.flowObservations || [],
    [data]
  );
  return {
    isLoading,
    levelObservations: levelObservations,
    flowObservations,
  };
};
