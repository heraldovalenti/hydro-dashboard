import React from 'react';
import { getAesTimeString } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

export const StationTypes = {
  weather: 'WEATHER',
  hydrometric: 'HYDROMETRIC',
};

const RainInfo = ({ hours, stationData }) => {
  const { t } = useTranslation();
  console.log(JSON.stringify(stationData));
  const accumulated = stationData.accumulation[0]?.accumulation?.toFixed(2);
  const unit = stationData.observations.content[0]?.unit.alias;
  return (
    <div>
      <h4>{t('weather_station_info_header', { hours, accumulated, unit })}</h4>
      <ul>
        {stationData.observations.content.map((o) => {
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

const LevelInfo = ({ hours, stationData }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h4>{t('hydrometric_station_info_header', { hours })}</h4>
      <ul>
        {stationData.observations.content.map((o) => {
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

const StationInfo = ({ station, stationType, hours, stationData }) => {
  return (
    <div>
      <h3>{station.description}</h3>
      {!stationData && <CircularProgress />}
      {stationData && stationType === StationTypes.weather && (
        <RainInfo hours={hours} stationData={stationData} />
      )}
      {stationData && stationType === StationTypes.hydrometric && (
        <LevelInfo hours={hours} stationData={stationData} />
      )}
    </div>
  );
};

export default StationInfo;
