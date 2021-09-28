import React from 'react';
import { useHistory } from 'react-router-dom';
import ForecastTable from '../components/ForecastTable';
import { ROUTE_ROOT } from './Routes';

export default () => {
  const history = useHistory();
  return (
    <ForecastTable
      onClose={() =>
        history.push({
          pathname: ROUTE_ROOT,
        })
      }
    />
  );
};
