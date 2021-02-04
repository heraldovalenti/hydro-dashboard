import React, { useState, useEffect } from 'react';
import {
  loadCredentials,
  persistCredentials,
  destroyCredentials,
} from '../services/auth';

export const AuthContext = React.createContext(null);

export default ({ children }) => {
  const [credentials, setCredentials] = useState(null);

  const login = async (credentials) => {
    await persistCredentials(credentials);
    setCredentials(credentials);
  };

  const logout = async () => {
    await destroyCredentials();
    setCredentials(null);
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
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
