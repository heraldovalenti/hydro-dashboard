import React, { useState, useEffect } from 'react';
import {
  loadCredentials,
  persistCredentials,
  destroyCredentials,
} from '../services/auth';

export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [credentials, setCredentials] = useState(null);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const login = async (credentials) => {
    await persistCredentials(credentials);
    setCredentials(credentials);
  };

  const logout = async (statusCode) => {
    await destroyCredentials();
    setCredentials(null);
    if (statusCode === 401) {
      setWrongCredentials(true);
    }
  };

  const loadInitialState = async () => {
    const credentials = await loadCredentials();
    setCredentials(credentials);
  };

  useEffect(() => {
    loadInitialState();
  }, []);

  const store = {
    credentials,
    login,
    logout,
    wrongCredentials,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
