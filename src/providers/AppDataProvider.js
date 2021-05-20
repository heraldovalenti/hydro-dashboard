import React, { useState, useEffect, useContext } from 'react';
import initServiceInterceptors from '../services';
import { fetchAccumulationData, fetchStations } from '../services/backend';
import { fetchStreams } from '../services/Streams';
import { fetchBasins } from '../services/Basins';
import config from '../config';
import { AuthContext } from './AuthProvider';
import { loadAuthHandler, removeAuthHandler } from '../services/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { accumulationDataActions } from '../reducers/accumulations';

export const AppDataContext = React.createContext(null);

const AppDataProvider = ({
  dateFrom,
  dateTo,
  accumulationDataActions: {
    setAccumulationInterval,
    setAccumulationData,
    setIntervalAndAccumulationData,
  },
  children,
}) => {
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
      fetchAccumulationData(dateFrom, dateTo),
    ])
      .then(([data, stations, basins, streams, accumulationData]) => {
        //fetch data in here
        setStations(stations);
        setBasins(basins);
        setStreams(streams);
        console.log(
          `calling setIntervalAndAccumulationData with ${dateFrom} ${dateTo} ${JSON.stringify(
            accumulationData
          )}`
        );
        setIntervalAndAccumulationData({ dateFrom, dateTo, accumulationData });
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
    fetchData(dateFrom, dateTo);
    return () => removeAuthHandler(loginHandler);
  }, [dateFrom, dateTo]);

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

const mapStateToProps = (state) => {
  return {
    dateTo: state.intervalFilter.dateTo,
    dateFrom: state.intervalFilter.dateFrom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accumulationDataActions: bindActionCreators(
      { ...accumulationDataActions },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDataProvider);
