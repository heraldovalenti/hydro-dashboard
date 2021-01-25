import React, { useState, useEffect } from 'react';
import { loadCredentials } from '../services/auth';

export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [credentials, setCredentials] = useState(null);

  const fetchData = async () => {
    const credentials = await loadCredentials();
    setCredentials(credentials);
  };

  const logout = () => {
    setCredentials(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const store = {
    credentials,
    setCredentials,
    logout,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
