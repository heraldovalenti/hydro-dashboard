import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { useSelector } from 'react-redux';
import { fetchAccumulationData } from '../services/backend';

export const useAccumulationData = () => {
  const { dateFrom, dateTo } = useSelector((state) => {
    return {
      dateTo: state.intervalFilter.dateTo,
      dateFrom: state.intervalFilter.dateFrom,
    };
  });
  const { data = [], isLoading } = useQuery(
    [queryKeys.ACCUMULATION_DATA, dateFrom, dateTo],
    async () => {
      const accumulationData = await fetchAccumulationData(dateFrom, dateTo);
      return accumulationData;
    }
  );
  return { isLoading, accumulationData: data };
};
