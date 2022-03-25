import React from 'react';
import { useHistory } from 'react-router-dom';
import { AesConfig } from '../components/AesConfig';
import { ROUTE_ROOT } from './Routes';

export const AppConfigPage = () => {
  const history = useHistory();
  return (
    <AesConfig
      onClose={() =>
        history.push({
          pathname: ROUTE_ROOT,
        })
      }
    />
  );
};
