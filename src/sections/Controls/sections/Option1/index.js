import React, { useContext } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { StoreContext } from '../../../../store';
import './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapFilterActions } from '../../../../reducers/mapFilter';

const Option1 = (props) => {
  const {} = useContext(StoreContext);
  const {
    mapFilterActions: {
      toggleHydroMetricStations,
      toggleWeatherStations,
      toggleStreams,
      toggleBasins,
    },
  } = props;
  return (
    <CollapsiblePanel title="Option 1" expanded>
      <div style={{ width: '100%' }} className="control-panel">
        <div className="row">
          <div
            style={{ width: '100%' }}
            className="label desc"
            onClick={toggleHydroMetricStations}
          >
            Hydro metric stations
          </div>
          <div
            style={{ width: '100%' }}
            className="label desc"
            onClick={toggleWeatherStations}
          >
            Weather stations
          </div>
          <div
            style={{ width: '100%' }}
            className="label desc"
            onClick={toggleStreams}
          >
            Streams
          </div>
          <div
            style={{ width: '100%' }}
            className="label desc"
            onClick={toggleBasins}
          >
            Basins
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Option1);
