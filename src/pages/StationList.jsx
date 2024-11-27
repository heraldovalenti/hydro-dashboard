import React from 'react';
import { StationList as List } from '../components/Stations';
import { useNavigation } from '../hooks/useNavigation';

export const StationList = () => {
  const { goToMain } = useNavigation();
  return <List onClose={goToMain} />;
};
