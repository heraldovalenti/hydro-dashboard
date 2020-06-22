import React, { useState, useEffect } from 'react';
import { setAuthToken } from './services/auth';
import initServiceInterceptors from './services';
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

  const store = {
    fetchStartDate,
    fetchEndDate,
    setFetchStartDate,
    fetchData,
    loading,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
