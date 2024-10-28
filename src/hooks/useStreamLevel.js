import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { fetchStreamLevelData } from '../services/backend';
import { useDateInterval } from './useDateInterval';

export const useStreamLevel = () => {
  const { from, to } = useDateInterval();
  const { data = [], isLoading } = useQuery(
    [queryKeys.STREAM_LEVEL, from, to],
    async () => {
      const streamLevelData = await fetchStreamLevelData(from, to);
      return streamLevelData;
    }
  );
  return { isLoading, streamLevelData: data };
};
