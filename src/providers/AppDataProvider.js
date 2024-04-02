import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { fetchStations } from '../services/backend';
import { fetchStreams } from '../services/Streams';
import { fetchBasins } from '../services/Basins';
import { useAuth } from './AuthProvider';
import { loadAuthHandler, removeAuthHandler } from '../services/auth';

export const AppDataContext = createContext(null);

const AppDataProvider = ({ children }) => {
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

  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [basins, setBasins] = useState([]);
  const [streams, setStreams] = useState([]);

  const fetchInitialData = useCallback(() => {
    Promise.all([fetchStations(), fetchBasins(), fetchStreams()])
      .then(([_stations, _basins, _streams]) => {
        setStations(_stations);
        setBasins(_basins);
        setStreams(_streams);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const loginHandler = loadAuthHandler({ credentials, logout });
    if (loading) fetchInitialData();
    return () => removeAuthHandler(loginHandler);
  }, [credentials, fetchInitialData, loading, logout]);

  const contextStore = {
    fetchStartDate,
    fetchEndDate,
    setFetchStartDate,
    fetchData: fetchInitialData,
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
