import React, { useState, useEffect, useContext } from 'react';
import initServiceInterceptors from '../services';
import { fetchStations } from '../services/backend';
import { fetchStreams } from '../services/Streams';
import { fetchBasins } from '../services/Basins';
import config from '../config';
import { AuthContext } from './AuthProvider';
import { loadAuthHandler, removeAuthHandler } from '../services/auth';

export const AppDataContext = React.createContext(null);

export default ({ children }) => {
  const { credentials, logout } = useContext(AuthContext);

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

  const fetchData = (startDate, endDate) => {
    Promise.all([
      Promise.resolve({}),
      fetchStations(),
      fetchBasins(),
      fetchStreams(),
    ])
      .then(([data, stations, basins, streams]) => {
        //fetch data in here
        setStations(stations);
        setBasins(basins);
        setStreams(streams);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    process.env.REACT_APP_ENV === 'development' &&
      config.serviceInterceptors &&
      initServiceInterceptors();
    const loginHandler = loadAuthHandler({ credentials, logout });
    fetchData(fetchStartDate, fetchEndDate);
    return () => removeAuthHandler(loginHandler);
  }, []);

  const contextStore = {
    fetchStartDate,
    fetchEndDate,
    setFetchStartDate,
    fetchData,
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
