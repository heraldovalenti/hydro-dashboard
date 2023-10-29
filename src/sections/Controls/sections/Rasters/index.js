import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../../../components/RadioGroup';
import { useRasterContext } from '../../../../contexts/Raster';
import { BlueSlider } from '../../components/BlueSlider';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import LayerFilter from '../MapLayers/layerFilter';
import { List, ListItem, ListItemText } from '@material-ui/core';

export const Rasters = () => {
  const {
    loading,
    showRaster,
    setShowRaster,
    rastersData,
    setSelectedRaster,
    opacity,
    setOpacity,
    gradientColors,
  } = useRasterContext();
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
  const handleOpacityChange = (_clazz, value) => {
    setShowRaster(!showRaster);
    setOpacity(value);
    setTimeout(() => setShowRaster(showRaster), 1);
  };
  return (
    <CollapsiblePanel title={t('control_panel_rasters_title')} expanded={false}>
      <div style={{ width: '100%' }} className="control-panel">
        <LayerFilter
          onClick={toggleShowRaster}
          checked={showRaster}
          description={t('control_panel_rasters_show')}
        />
        {t('control_panel_rasters_opacity')}
        <BlueSlider
          value={opacity}
          onChange={handleOpacityChange}
          aria-labelledby="input-slider"
          max={100}
          valueLabelDisplay="auto"
        />
        <RadioGroup
          items={rasterOptions}
          onChange={handleRadioChange}
          value={selected}
          disabled={loading}
        />
        <List
          style={{
            marginInline: 32,
          }}
        >
          {gradientColors.map((c, i) => {
            return (
              <ListItem
                key={c}
                title={c}
                color={c}
                style={{
                  height: 16,
                  backgroundColor: c,
                }}
              >
                <ListItemText
                  style={{
                    fontSize: 10,
                    color: i >= 3 && i <= 10 ? '#343434' : '#f0f0f0',
                  }}
                >
                  {((i * 100) / gradientColors.length).toFixed(0)} mm
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </div>
    </CollapsiblePanel>
  );
};
