import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import { FC, useContext, useEffect, useRef } from 'react';
import { FillAttributes, StrokeAttributes } from './types';

type RectangleProps = {
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
} & StrokeAttributes &
  FillAttributes;

export const Rectangle: FC<RectangleProps> = ({
  strokeColor,
  strokeOpacity,
  strokeWeight,
  fillColor,
  fillOpacity,
  bounds,
}) => {
  const map = useContext(GoogleMapsContext)?.map;
  const rectangle = useRef(new google.maps.Rectangle()).current;
  useEffect(() => {
    if (!map) {
      return;
    }
    rectangle.setMap(map);
    rectangle.setOptions({
      strokeColor,
      strokeOpacity,
      strokeWeight,

      fillColor,
      fillOpacity,
      bounds,
    });

    return () => {
      rectangle.setMap(null);
    };
  }, [
    bounds,
    fillColor,
    fillOpacity,
    map,
    rectangle,
    strokeColor,
    strokeOpacity,
    strokeWeight,
  ]);

  return null;
};
