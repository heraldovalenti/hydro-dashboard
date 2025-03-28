import React from 'react';
import ForecastTable from '../components/ForecastTable';
import { useNavigation } from '../hooks/useNavigation';

export const Forecast = () => {
  const { goToMain } = useNavigation();
  return <ForecastTable onClose={goToMain} />;
};
