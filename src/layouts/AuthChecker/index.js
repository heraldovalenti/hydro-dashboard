import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import AppDataProvider from '../../providers/AppDataProvider';
import LoginForm from '../../sections/LoginForm';
import Routes from '../../pages/Routes';
import { RasterProvider } from '../../contexts/Raster';

const AuthChecker = () => {
  const { credentials } = useContext(AuthContext);
  if (credentials) {
    return (
      <AppDataProvider>
        <RasterProvider>
          <Routes />
        </RasterProvider>
      </AppDataProvider>
    );
  } else {
    return <LoginForm />;
  }
};

export default AuthChecker;
