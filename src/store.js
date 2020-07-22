import React, { useState, useEffect } from 'react';
import { setAuthToken } from './services/auth';
import initServiceInterceptors from './services';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

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

  const fetchData = (startDate, endDate) => {
    Promise.all([Promise.resolve({})])
      .then(([data]) => {
        //fetch data in here
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    process.env.REACT_APP_ENV === 'development' && initServiceInterceptors();
    fetchData(fetchStartDate, fetchEndDate);
  }, []);

  const contextStore = {
    fetchStartDate,
    fetchEndDate,
    setFetchStartDate,
    fetchData,
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
