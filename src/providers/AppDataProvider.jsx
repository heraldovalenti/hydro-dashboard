import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { fetchStations } from '../services/backend';
import { fetchStreams } from '../services/Streams';
import { fetchBasins } from '../services/Basins';
import { useAuth } from './AuthProvider';
import { loadAuthHandler, removeAuthHandler } from '../services/auth';
import { queryKeys } from '../constants';
import { useQuery } from 'react-query';

export const AppDataContext = createContext(null);

const AppDataProvider = ({ children, ready }) => {
  const { credentials, logout } = useAuth();
  const currentDate = new Date();
  const [fetchStartDate, setFetchStartDate] = useState(
    new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        -12
      )
    )
  );
  const fetchEndDate = new Date(currentDate);

  const { data: basins = [], isLoading: isBasinsLoading } = useQuery(
    [queryKeys.LOAD_BASINS],
    fetchBasins,
    { enabled: ready }
  );
  const { data: streams = [], isLoading: isStreamsLoading } = useQuery(
    [queryKeys.LOAD_STREAMS],
    fetchStreams
  );
  const { data: stations = [], isLoading: isStationsLoading } = useQuery(
    [queryKeys.LOAD_STATIONS],
    fetchStations,
    { enabled: ready }
  );
  const loading = useMemo(
    () => isBasinsLoading || isStreamsLoading || isStationsLoading,
    [isBasinsLoading, isStreamsLoading, isStationsLoading]
  );

  const contextStore = {
    fetchStartDate,
    fetchEndDate,
    setFetchStartDate,
    // fetchData: fetchInitialData,
    stations,
    streams,
    basins,
    loading,
  };

  return (
    <AppDataContext.Provider value={contextStore}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData shoud be used in an AppDataProvider');
  }
  return context;
};

export default AppDataProvider;
