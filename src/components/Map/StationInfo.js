import React from 'react';
import { getAesTimeString } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

const RainInfo = ({ hours, stationData }) => {
  const { t } = useTranslation();
  const accumulated = stationData.rainAccumulations[0]?.accumulation.toFixed(2);
  const unit = stationData.observationSeries[0]?.unit.alias;
  return (
    <div>
      <h4>{t('weather_station_info_header', { hours, accumulated, unit })}</h4>
      <ul>
        {stationData.observationSeries.map((o) => {
          return (
            <li>
              {getAesTimeString(o.time)} {o.value.toFixed(2)} {o.unit.alias}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const StationInfo = ({ station, hours, stationData }) => {
  return (
    <div>
      <h3>{station.description}</h3>
      {!stationData && <CircularProgress />}
      {stationData && <RainInfo hours={hours} stationData={stationData} />}
    </div>
  );
};

export default StationInfo;
