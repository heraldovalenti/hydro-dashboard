import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapsiblePanel from '../components/CollapsiblePanel';
import LayerFilter from './MapLayers/layerFilter';
import { useStreamFilter } from '../../../hooks/useStreamFilter';
import { useAppData } from '../../../providers/AppDataProvider';

export const StreamFilter = () => {
  const { t } = useTranslation();
  const { toggleStreamVisibility, shouldHideStream } = useStreamFilter();
  const { streams } = useAppData();
  return (
    <CollapsiblePanel title={t('control_panel_layers_streams_filter_title')}>
      <div style={{ width: '100%' }} className="control-panel">
        {streams.map(({ streamName }) => {
          return (
            <LayerFilter
              onClick={() => toggleStreamVisibility(streamName)}
              checked={!shouldHideStream(streamName)}
              description={t('control_panel_layers_streams_filter_item', {
                stream: streamName,
              })}
              key={streamName}
            />
          );
        })}
      </div>
    </CollapsiblePanel>
  );
};
