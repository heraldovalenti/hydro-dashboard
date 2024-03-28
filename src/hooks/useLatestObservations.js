import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { useSelector } from 'react-redux';
import { fetchLatestbservations } from '../services/backend';
import {
  flowDimension,
  levelDimension,
} from '../components/StationInfo/stationUtil';

export const useLatestObservations = () => {
  const { dateFrom, dateTo } = useSelector((state) => {
    return {
      dateTo: state.intervalFilter.dateTo,
      dateFrom: state.intervalFilter.dateFrom,
    };
  });
  const { data, isLoading } = useQuery(
    [queryKeys.LATEST_OBSERVATIONS, dateFrom, dateTo],
    async () => {
      const [levelObservations, flowObservations] = await Promise.all([
        fetchLatestbservations(levelDimension, dateFrom, dateTo),
        fetchLatestbservations(flowDimension, dateFrom, dateTo),
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
