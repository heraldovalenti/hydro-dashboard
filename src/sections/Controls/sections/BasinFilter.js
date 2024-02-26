import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapsiblePanel from '../components/CollapsiblePanel';
import LayerFilter from './MapLayers/layerFilter';
import { useBasinFilter } from '../../../hooks/useBasinFilter';
import { useAppData } from '../../../providers/AppDataProvider';

export const BasinFilter = () => {
  const { t } = useTranslation();
  const { toggleBasinVisibility, shouldHideBasin } = useBasinFilter();
  const { basins } = useAppData();
  console.log(
    'BasinFilter()',
    basins.map((b) => ({ id: b.id, hiden: shouldHideBasin(b.id) }))
  );
  return (
    <CollapsiblePanel title={t('control_panel_layers_basins_filter_title')}>
      <div style={{ width: '100%' }} className="control-panel">
        {basins.map((b) => {
          return (
            <LayerFilter
              onClick={() => toggleBasinVisibility(b.id)}
              checked={!shouldHideBasin(b.id)}
              description={t('control_panel_layers_basins_filter_item', {
                basin: b.id,
              })}
            />
          );
        })}
      </div>
    </CollapsiblePanel>
  );
};
