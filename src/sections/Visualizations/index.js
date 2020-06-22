import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../../store';
import Header from '../Header';
import FullscreenModal from '../../components/FullscreenModal';
import './styles.css';

export default function Visualizations() {
  const {
    //get data from context
  } = useContext(StoreContext);
  const { t } = useTranslation();
  const visualizationTitle = (
    <Header
      title={t('page_header_title')}
      subtitle={t('page_header_text')}
      showDates
    />
  );

  return (
    <div className="visualizations">
      <FullscreenModal title={visualizationTitle}>
        <div></div>
        {/* 
          Put viz in here
        */}
      </FullscreenModal>
    </div>
  );
}
