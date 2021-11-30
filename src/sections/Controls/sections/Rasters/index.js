import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../../../components/RadioGroup';
import { useRaster } from '../../../../contexts/Raster';
import { getRaster, listRasters } from '../../../../services/Rasters';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import LayerFilter from '../MapLayers/layerFilter';

export const Rasters = () => {
  const { showRaster, setShowRaster, setRasterData } = useRaster();
  const { t } = useTranslation();
  const [rasterList, setRasterList] = useState([]);
  const [selected, setSelected] = useState({});
  const [retrievedRasters, setRetrievedRasters] = useState({});
  const [loading, setLoading] = useState(true);
  const toggleShowRaster = () => setShowRaster(!showRaster);
  useEffect(() => {
    const fetch = async () => {
      const response = await listRasters();
      const sorted = response.sort(
        (i, j) => new Date(j.date) - new Date(i.date)
      );
      const result = sorted.map((fileDescriptor) => {
        const { name } = fileDescriptor;
        return {
          label: name,
          value: name,
        };
      });
      setLoading(false);
      setRasterList(result);
    };
    fetch();
  }, []);
  const handleRadioChange = (item) => {
    setSelected(item);
    const fetchRaster = async (raster) => {
      setLoading(true);
      const retrievedRasterData = await getRaster(raster);
      setRetrievedRasters({
        ...retrievedRasters,
        [raster]: retrievedRasterData,
      });
      setRasterData(retrievedRasterData);
      setLoading(false);
    };
    const rasterData = retrievedRasters[item];
    if (!rasterData) {
      fetchRaster(item);
    } else {
      setRasterData(rasterData);
    }
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
          items={rasterList}
          onChange={handleRadioChange}
          value={selected}
          disabled={loading}
        />
      </div>
    </CollapsiblePanel>
  );
};
