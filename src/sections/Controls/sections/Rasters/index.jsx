import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../../../components/RadioGroup';
import { useRasterContext } from '../../../../providers/RastersProvider';
import { BlueSlider } from '../../components/BlueSlider';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import LayerFilter from '../MapLayers/layerFilter';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material';

export const Rasters = () => {
  const {
    showRaster,
    setShowRaster,
    rastersData,
    setSelectedRaster,
    opacity,
    setOpacity,
    gradientColors,
    wrfData,
    wrfLoading,
    sqpeData,
    sqpeLoading,
    acumData,
    acumLoading,
  } = useRasterContext();
  const { t } = useTranslation();
  const [selected, setSelected] = useState({});
  const toggleShowRaster = () => setShowRaster(!showRaster);
  const wrfOptions = useMemo(
    () =>
      wrfData.map(({ fileDescriptor }) => {
        const { name } = fileDescriptor;
        return {
          label: name,
          value: name,
        };
      }),
    [wrfData]
  );
  const sqpeOptions = useMemo(
    () =>
      sqpeData.map(({ fileDescriptor }) => {
        const { name } = fileDescriptor;
        return {
          label: name,
          value: name,
        };
      }),
    [sqpeData]
  );
  const acumOptions = useMemo(
    () =>
      acumData.map(({ fileDescriptor }) => {
        const { name } = fileDescriptor;
        return {
          label: name,
          value: name,
        };
      }),
    [acumData]
  );

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
        <Box my={2}>
          <RadioGroup
            legend={t('control_panel_rasters_model_wrf')}
            items={wrfOptions}
            onChange={handleRadioChange}
            value={selected}
            disabled={wrfLoading}
          />
          {wrfLoading && (
            <Box my={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box my={2}>
          <RadioGroup
            legend={t('control_panel_rasters_model_sqpe')}
            items={sqpeOptions}
            onChange={handleRadioChange}
            value={selected}
            disabled={sqpeLoading}
          />
          {sqpeLoading && (
            <Box my={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box my={2}>
          <RadioGroup
            legend={t('control_panel_rasters_model_acum')}
            items={acumOptions}
            onChange={handleRadioChange}
            value={selected}
            disabled={acumLoading}
          />
          {acumLoading && (
            <Box my={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
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
