import React, { useContext } from 'react';
import './styles.css';
import MapLayers from './sections/MapLayers';
import DataFilter from './sections/DataFilter';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import { FORECAST_PAGE } from '../../pages/Routes';

export default function Controls() {
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <div className="controls">
      <h4 className="controls__title">{t('control_panel_title')}</h4>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: FORECAST_PAGE })}
        style={{ width: '100%' }}
      >
        {t('forecast_page_title')}
      </Button>
      <MapLayers />
      <DataFilter />
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
