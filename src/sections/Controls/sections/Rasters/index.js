import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../../../components/RadioGroup';
import { useRaster } from '../../../../contexts/Raster';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import LayerFilter from '../MapLayers/layerFilter';

export const Rasters = () => {
  const {
    loading,
    showRaster,
    setShowRaster,
    rastersData,
    setSelectedRaster,
  } = useRaster();
  const { t } = useTranslation();
  const [rasterOptions, setRasterOptions] = useState([]);
  const [selected, setSelected] = useState({});
  const toggleShowRaster = () => setShowRaster(!showRaster);
  useEffect(() => {
    if (!loading && rastersData) {
      const options = rastersData.map(({ fileDescriptor }) => {
        const { name } = fileDescriptor;
        return {
          label: name,
          value: name,
        };
      });
      setRasterOptions(options);
    }
  }, [loading, rastersData]);

  const handleRadioChange = (item) => {
    setShowRaster(!showRaster);
    setSelected(item);
    const selectedRasterData = rastersData.find((rd) => {
      return rd.fileDescriptor.name === item;
    });
    setSelectedRaster(selectedRasterData);
    setTimeout(() => setShowRaster(showRaster), 1);
  };
  return (
    <CollapsiblePanel title={t('control_panel_rasters_title')}>
      <div style={{ width: '100%' }} className="control-panel">
        <LayerFilter
          onClick={toggleShowRaster}
          checked={showRaster}
          description={t('control_panel_rasters_show')}
        />
        <RadioGroup
          items={rasterOptions}
          onChange={handleRadioChange}
          value={selected}
          disabled={loading}
        />
      </div>
    </CollapsiblePanel>
  );
};
