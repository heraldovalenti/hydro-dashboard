import React, { useState, useEffect } from 'react';
import { Marker } from 'google-maps-react';
import { fetchRainData } from '../../services/backend';
import dropIcon from '../../components/Icons/drop-icon.png';

const WeatherStation = ({ station, dateFrom, dateTo, onClick }) => {
  const [accumulated, setAccumulated] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const stationData = await fetchRainData(station.id, dateFrom, dateTo);
      const accumulation = stationData.accumulation[0]?.accumulation?.toFixed(
        2
      );
      setAccumulated(accumulation);
    };
    fetchData();
  }, [dateFrom, dateTo]);
  console.log(
    `station ${station.id} accumulated ${accumulated} ${JSON.stringify(
      station
    )}`
  );
  return (
    <Marker
      position={{ lat: station.latitude, lng: station.longitude }}
      icon={dropIcon}
      stationId={station.id}
      opacity={1}
      onClick={onClick}
      label={{
        text: accumulated ? accumulated : '?',
        color: '#ffffff',
        fontWeight: '600',
      }}
    />
  );
};

export default WeatherStation;
