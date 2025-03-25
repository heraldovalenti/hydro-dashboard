import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import AppDataProvider from '../../providers/AppDataProvider';
import LoginForm from '../../sections/LoginForm';
import { Pages } from '../../pages/Pages';
import { RasterProvider } from '../../providers/RastersProvider';
import { loadAuthHandler, removeAuthHandler } from '../../services/auth';

const AuthChecker = () => {
  const [ready, setReady] = useState(false);
  const { credentials, logout } = useAuth();

  useEffect(() => {
    if (credentials) {
      const loginHandler = loadAuthHandler({ credentials, logout });
      setReady(true);
      return () => removeAuthHandler(loginHandler);
    }
  }, [credentials, logout]);

  if (credentials) {
    return (
      <AppDataProvider ready={ready}>
        <RasterProvider>
          <Pages />
        </RasterProvider>
      </AppDataProvider>
    );
  }

  return <LoginForm />;
};

export default AuthChecker;
