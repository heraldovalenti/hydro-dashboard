import React, { useContext } from 'react';
import StationInfo from '../components/Map/StationInfo';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ROUTE_MAP_PAGE } from './Routes';
import { AppDataContext } from '../providers/AppDataProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

const StationInfoPage = ({ dateFrom, dateTo, accumulationData }) => {
  const { id } = useParams();
  const history = useHistory();
  const stationId = Number.parseInt(id);
  const { stations } = useContext(AppDataContext);
  const station = stations.filter((s) => s.id === stationId)[0];
  const stationAccumulations = accumulationData.filter(
    (stationAccumulation) => stationAccumulation.stationId === stationId
  );
  let accumulation = undefined;
  if (
    stationAccumulations[0] &&
    stationAccumulations[0].rainAccumulationList[0]
  ) {
    const value = stationAccumulations[0].rainAccumulationList[0].accumulation;
    accumulation = `${value.toFixed(0)}`;
  }
  if (!station) {
    return <CircularProgress />;
  }
  return (
    <StationInfo
      station={station}
      dateFrom={dateFrom}
      dateTo={dateTo}
      accumulation={accumulation}
      onClose={() =>
        history.push({
          pathname: ROUTE_MAP_PAGE,
        })
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dateTo: state.intervalFilter.dateTo,
    dateFrom: state.intervalFilter.dateFrom,
    accumulationData: state.accumulationData.accumulationData,
    accumulationLoading: state.accumulationData.loading,
  };
};

export default connect(mapStateToProps)(StationInfoPage);
