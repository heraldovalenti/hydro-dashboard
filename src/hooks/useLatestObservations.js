import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { fetchLatestbservations } from '../services/backend';
import {
  flowDimension,
  levelDimension,
} from '../components/StationInfo/stationUtil';
import { useDateInterval } from './useDateInterval';

export const useLatestObservations = () => {
  const { from, to } = useDateInterval();
  const { data, isLoading } = useQuery(
    [queryKeys.LATEST_OBSERVATIONS, from, to],
    async () => {
      const [levelObservations, flowObservations] = await Promise.all([
        fetchLatestbservations(levelDimension, from, to),
        fetchLatestbservations(flowDimension, from, to),
      ]);
      return { levelObservations, flowObservations };
    }
  );
  const levelObservations = useMemo(() => data?.levelObservations || [], [
    data,
  ]);
  const flowObservations = useMemo(() => data?.flowObservations || [], [data]);
  return {
    isLoading,
    levelObservations: levelObservations,
    flowObservations,
  };
};
