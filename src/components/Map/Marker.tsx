import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { FC } from 'react';
import { Coordinate } from './types';
import levelIcon from '../../components/Icons/level-icon.png';
import { Observation } from '../../model/Observation';
import { HQOservation } from '../StationInfo/stationUtil';
import { useStationFilters } from '../../hooks/useStationFilters';

type MarkerProps = {
  position: Coordinate;
  onClick: (e: google.maps.MapMouseEvent) => void;
  level?: Observation;
  flow?: Observation;
};

export const Marker: FC<MarkerProps> = ({ position, onClick, level, flow }) => {
  const { hideEmptyStations } = useStationFilters();
  const hydrometric_data = HQOservation({ h: level, q: flow });
  if (!hydrometric_data && hideEmptyStations) {
    return null;
  }
  return (
    <AdvancedMarker position={position} onClick={onClick}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={levelIcon}
          style={{
            position: 'absolute',
            zIndex: -1,
          }}
        />
        <p
          style={{
            color: '#fafafa',
            fontSize: 14,
            fontWeight: 600,
            textShadow:
              '-1px 0 #1c1b1a, 0 1px #1c1b1a, 1px 0 #1c1b1a, 0 -1px #1c1b1a',
          }}
        >
          {hydrometric_data}
        </p>
      </div>
    </AdvancedMarker>
  );
};
