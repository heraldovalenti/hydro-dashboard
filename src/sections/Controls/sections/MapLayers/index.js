import React from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapFilterActions } from '../../../../reducers/mapFilter';
import { useTranslation } from 'react-i18next';
import LayerFilter from './layerFilter';
import { useStationFilters } from '../../../../hooks/useStationFilters';

const MapLayers = (props) => {
  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
    hideEmptyStations,
  } = useStationFilters();
  const {
    mapFilterActions: {
      toggleHydroMetricStations,
      toggleWeatherStations,
      toggleStreams,
      toggleBasins,
      toggleEmptyStationsStations,
    },
  } = props;
  const { t } = useTranslation();
  return (
    <CollapsiblePanel title={t('control_panel_layers_title')} expanded>
      <div style={{ width: '100%' }} className="control-panel">
        <LayerFilter
          onClick={toggleHydroMetricStations}
          checked={showHydroMetricStations}
          description={t('control_panel_layers_hydro_metric_stations')}
        />
        <LayerFilter
          onClick={toggleWeatherStations}
          checked={showWeatherStations}
          description={t('control_panel_layers_weather_stations')}
        />
        <LayerFilter
          onClick={toggleStreams}
          checked={showStreams}
          description={t('control_panel_layers_streams')}
        />
        <LayerFilter
          onClick={toggleBasins}
          checked={showBasins}
          description={t('control_panel_layers_basins')}
        />
        <LayerFilter
          onClick={toggleEmptyStationsStations}
          checked={hideEmptyStations}
          description={t('control_panel_layers_empty_stations')}
        />
      </div>
    </CollapsiblePanel>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    mapFilterActions: bindActionCreators({ ...mapFilterActions }, dispatch),
  };
};

export default connect(undefined, mapDispatchToProps)(MapLayers);
