import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Main from '../Main';
import AppDataProvider from '../../providers/AppDataProvider';
import LoginForm from '../../sections/LoginForm';
import Routes from '../../pages/Routes';

const AuthChecker = () => {
  const { credentials } = useContext(AuthContext);
  if (credentials) {
    return (
      <AppDataProvider>
        <Routes />
      </AppDataProvider>
    );
  } else {
    return <LoginForm />;
  }
};

export default AuthChecker;
