import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import { FC, useContext, useEffect, useRef } from 'react';
import { Coordinate, StrokeAttributes } from './types';

type PolylineProps = {
  path: Coordinate[];
} & StrokeAttributes;

export const Polyline: FC<PolylineProps> = ({
  path,
  strokeColor,
  strokeOpacity,
  strokeWeight,
}) => {
  const map = useContext(GoogleMapsContext)?.map;
  const polyline = useRef(new google.maps.Polyline()).current;

  useEffect(() => {
    if (!map) {
      return;
    }
    polyline.setMap(map);
    polyline.setOptions({
      strokeColor,
      strokeOpacity,
      strokeWeight,
      path,
    });

    return () => {
      polyline.setMap(null);
    };
  }, [map, path, polyline, strokeColor, strokeOpacity, strokeWeight]);

  return null;

  return (
    <Polyline
      path={path}
      strokeColor={strokeColor}
      strokeOpacity={strokeOpacity}
      strokeWeight={strokeWeight}
    />
  );
};
