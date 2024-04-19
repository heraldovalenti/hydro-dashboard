import React from 'react';
import { useHistory } from 'react-router-dom';
import { StationList as List } from '../components/Stations';
import { ROUTE_ROOT } from './Routes';

export const StationList = () => {
  const history = useHistory();
  return (
    <List
      onClose={() =>
        history.push({
          pathname: ROUTE_ROOT,
        })
      }
    />
  );
};
