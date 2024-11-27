import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  loadCredentials,
  persistCredentials,
  destroyCredentials,
} from '../services/auth';

export const AuthContext = createContext(null);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth should be used in an AuthProvider');
  }
  return context;
};
