import React from 'react';
import './styles.css';
import MapLayers from './sections/MapLayers';
import { useTranslation } from 'react-i18next';

export default function Controls() {
  const { t } = useTranslation();
  return (
    <div className="controls">
      <h4 className="controls__title">{t('control_panel_title')}</h4>
      <MapLayers />
    </div>
  );
}
