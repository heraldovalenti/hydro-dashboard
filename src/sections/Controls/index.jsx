import React, { useContext } from 'react';
import './styles.css';
import { MapLayers } from './sections/MapLayers';
import { DataFilter } from './sections/DataFilter';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { AuthContext } from '../../providers/AuthProvider';
import { Rasters } from './sections/Rasters';
import { BasinFilter } from './sections/BasinFilter';
import { StreamFilter } from './sections/StreamFilter';
import { useNavigation } from '../../hooks/useNavigation';
import { MapStyles } from './sections/MapStyle';

export default function Controls() {
  const { logout } = useContext(AuthContext);
  const { goToForecast } = useNavigation();
  const { t } = useTranslation();
  return (
    <div className="controls">
      <h4 className="controls__title">{t('control_panel_title')}</h4>
      <Button
        variant="contained"
        color="primary"
        onClick={goToForecast}
        style={{ width: '100%' }}
      >
        {t('forecast_page_title')}
      </Button>
      <MapStyles />
      <MapLayers />
      <DataFilter />
      <Rasters />
      <StreamFilter />
      <BasinFilter />
      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        style={{ width: '100%' }}
      >
        {t('auth_form_logout_button')}
      </Button>
    </div>
  );
}
