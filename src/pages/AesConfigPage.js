import React from 'react';
import { AesConfig } from '../components/AesConfig';
import { useNavigation } from '../hooks/useNavigation';

export const AppConfigPage = () => {
  const { goToMain } = useNavigation();
  return <AesConfig onClose={goToMain} />;
};
