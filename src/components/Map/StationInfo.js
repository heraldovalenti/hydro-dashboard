import React from 'react';
import { getAesTimeString } from '../../utils/date';
import { useTranslation } from 'react-i18next';

const StationInfo = ({ station, hours, stationData }) => {
  const { t } = useTranslation();
  const accumulated = stationData.rainAccumulations[0]?.accumulation.toFixed(2);
  const unit = stationData.observationSeries[0]?.unit.alias;
  return (
    <div>
      <h3>{station.description}</h3>
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

export default StationInfo;
