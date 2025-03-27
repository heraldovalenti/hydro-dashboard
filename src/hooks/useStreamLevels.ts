import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';
import { fetchStreamLevelData } from '../services/backend';
import { useDateInterval } from './useDateInterval';
import { useDamLevels } from './useDamLevels';
import { useCallback, useMemo } from 'react';
import { Station, StreamLevel } from '../model';

const MAROMA_STREAM_LEVEL_NAME = 'Maroma';
const MAROMA_STATION_ID = 65;

export const useStreamLevels = () => {
  const { from, to } = useDateInterval();
  const { cc } = useDamLevels();
  const { data = [], isLoading } = useQuery(
    [queryKeys.STREAM_LEVEL, from, to],
    async () => {
      const result = await fetchStreamLevelData(from, to);
      return result as StreamLevel[];
    }
  );
  const maromaHQModelValid = useMemo(() => !cc || cc.value < 1031, [cc]);
  const streamLevels = useMemo(() => {
    if (!maromaHQModelValid) {
      return data.filter(
        (streamLevel) => streamLevel.streamName !== MAROMA_STREAM_LEVEL_NAME
      );
    }
    return data;
  }, [data, maromaHQModelValid]);
  const isMaromaStation = useCallback(
    (station: Station) => station.id === MAROMA_STATION_ID,
    []
  );
  return { isLoading, streamLevels, maromaHQModelValid, isMaromaStation };
};
