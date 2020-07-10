import React from 'react';
import { Marker } from 'google-maps-react';
import levelIcon from '../../components/Icons/level-icon.png';

export default function (props) {
  const { hydroMetricStations, onMarkerClick } = props;
  const item = hydroMetricStations[0];
  console.log(`${JSON.stringify(item)}`);
  // hydroMetricStations.map((item) => (
  return (
    <>
      <Marker name={item.name} position={item.position} icon={levelIcon} />
    </>
  );
}
