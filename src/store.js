import React, { useState, useEffect } from 'react';
import { setAuthToken } from './services/auth';
import initServiceInterceptors from './services';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { fetchStations } from './services/backend';
import { fetchStreams } from './services/Streams';
import { fetchBasins } from './services/Basins';
import config from './config';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
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
    process.env.REACT_APP_ENV === 'development' && config.serviceInterceptors && initServiceInterceptors();
    fetchData(fetchStartDate, fetchEndDate);
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

  const reduxStore = createStore(rootReducer);

  return (
    <Provider store={reduxStore}>
      <StoreContext.Provider value={contextStore}>
        {children}
      </StoreContext.Provider>
    </Provider>
  );
};
