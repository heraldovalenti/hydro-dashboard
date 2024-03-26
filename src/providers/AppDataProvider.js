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
import { useDispatch, useSelector } from 'react-redux';
import { accumulationDataActions } from '../reducers/accumulations';
import { latestObservationsActions } from '../reducers/latestObservations';

export const AppDataContext = createContext(null);

const AppDataProvider = ({ children }) => {
  const { accumulationDataRequest } = accumulationDataActions;
  const { latestObservationsRequest } = latestObservationsActions;
  const { dateFrom, dateTo } = useSelector((state) => {
    return {
      dateTo: state.intervalFilter.dateTo,
      dateFrom: state.intervalFilter.dateFrom,
    };
  });
  const dispatch = useDispatch();

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
    dispatch(latestObservationsRequest(dateFrom, dateTo));
    dispatch(accumulationDataRequest(dateFrom, dateTo));
    Promise.all([
      Promise.resolve({}),
      fetchStations(),
      fetchBasins(),
      fetchStreams(),
    ])
      .then(([, _stations, _basins, _streams]) => {
        //fetch data in here
        setStations(_stations);
        setBasins(_basins);
        setStreams(_streams);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    accumulationDataRequest,
    dateFrom,
    dateTo,
    dispatch,
    latestObservationsRequest,
  ]);

  const syncAccumulationData = useCallback(() => {
    dispatch(latestObservationsRequest(dateFrom, dateTo));
    dispatch(accumulationDataRequest(dateFrom, dateTo));
  }, [
    accumulationDataRequest,
    dateFrom,
    dateTo,
    dispatch,
    latestObservationsRequest,
  ]);
  useEffect(() => {
    const loginHandler = loadAuthHandler({ credentials, logout });
    if (loading) fetchInitialData();
    else syncAccumulationData();
    return () => removeAuthHandler(loginHandler);
  }, [
    credentials,
    dateFrom,
    dateTo,
    fetchInitialData,
    loading,
    logout,
    syncAccumulationData,
  ]);

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
