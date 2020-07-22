import React, { useContext } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { StoreContext } from '../../../../store';
import './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapFilterActions } from '../../../../reducers/mapFilter';
import { useTranslation } from 'react-i18next';
import LayerFilter from './layerFilter';

const MapLayers = (props) => {
  const {} = useContext(StoreContext);
  const {
    showHydroMetricStations,
    showWeatherStations,
    showStreams,
    showBasins,
    mapFilterActions: {
      toggleHydroMetricStations,
      toggleWeatherStations,
      toggleStreams,
      toggleBasins,
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
      </div>
    </CollapsiblePanel>
  );
};
const mapStateToProps = (state) => {
  return {
    showHydroMetricStations: state.mapFilter.showHydroMetricStations,
    showWeatherStations: state.mapFilter.showWeatherStations,
    showStreams: state.mapFilter.showStreams,
    showBasins: state.mapFilter.showBasins,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    mapFilterActions: bindActionCreators({ ...mapFilterActions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapLayers);
