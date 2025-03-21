import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { FC, useEffect, useRef, useState } from 'react';
import { Coordinate } from './types';
import dropIcon from '../../components/Icons/drop-icon.png';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

type RainMarkerProps = {
  position: Coordinate;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  rain?: number;
  stationId: number;
  clusterRef?: MarkerClusterer | null;
};

export const RainMarker: FC<RainMarkerProps> = ({
  position,
  onClick,
  rain,
  clusterRef,
  stationId,
}) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  let color = '#31859c';
  if (rain && rain > 10) color = '#f3d41a';
  if (rain && rain > 30) color = '#e36d25';
  if (rain && rain > 50) color = '#ff0000';

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const oldRef = markerRef.current;
    if (oldRef) {
      clusterRef?.addMarker(oldRef);
    }
    return () => {
      if (oldRef) clusterRef?.removeMarker(oldRef);
    };
  }, [clusterRef, ready]);

  return (
    <AdvancedMarker
      title={`${stationId}`}
      position={position}
      onClick={onClick}
      ref={(ref) => {
        if (ref) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ref.stationId = stationId;
        }
        setReady(ref !== null);
        markerRef.current = ref;
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={dropIcon}
          style={{
            position: 'absolute',
            zIndex: -1,
          }}
        />
        <p
          style={{
            color: '#fafafa',
            fontSize: 14,
            fontWeight: 400,
            textShadow: `-1px 0 ${color}, 0 1px ${color}, 1px 0 ${color}, 0 -1px ${color}`,
          }}
        >
          {rain?.toFixed(0)}
        </p>
      </div>
    </AdvancedMarker>
  );
};
