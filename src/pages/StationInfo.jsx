import React, { useContext } from 'react';
import StationInfo from '../components/StationInfo';
import { useParams } from 'react-router-dom';
import { AppDataContext } from '../providers/AppDataProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { useAccumulationData } from '../hooks/useAccumulationData';
import { useDateInterval } from '../hooks/useDateInterval';
import { useNavigation } from '../hooks/useNavigation';

export const StationInfoPage = () => {
  const { from, to } = useDateInterval();
  const { accumulationData } = useAccumulationData();
  const { id } = useParams();
  const { goToMain } = useNavigation();
  const stationId = Number.parseInt(id);
  const { stations } = useContext(AppDataContext);

  const station = stations.filter((s) => s.id === stationId)[0];
  const stationAccumulations = accumulationData.find(
    (stationAccumulation) => stationAccumulation.stationId === stationId
  );
  let accumulation = undefined;
  if (stationAccumulations) {
    const value = stationAccumulations.accumulation || 0.0;
    accumulation = `${value.toFixed(0)}`;
  }
  if (!station) {
    return <CircularProgress />;
  }

  return (
    <StationInfo
      station={station}
      dateFrom={from}
      dateTo={to}
      accumulation={accumulation}
      onClose={goToMain}
    />
  );
};
