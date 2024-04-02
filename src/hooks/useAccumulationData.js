import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { fetchAccumulationData } from '../services/backend';
import { useDateInterval } from './useDateInterval';

export const useAccumulationData = () => {
  const { from, to } = useDateInterval();
  const { data = [], isLoading } = useQuery(
    [queryKeys.ACCUMULATION_DATA, from, to],
    async () => {
      const accumulationData = await fetchAccumulationData(from, to);
      return accumulationData;
    }
  );
  return { isLoading, accumulationData: data };
};
