import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import { FC, useContext, useEffect, useRef } from 'react';
import { Coordinate, FillAttributes, StrokeAttributes } from './types';

type PolygonProps = {
  paths: Coordinate[];
} & StrokeAttributes &
  FillAttributes;

export const Polygon: FC<PolygonProps> = ({
  paths,
  strokeColor,
  strokeOpacity,
  strokeWeight,
  fillColor,
  fillOpacity,
}) => {
  const map = useContext(GoogleMapsContext)?.map;
  const polyline = useRef(new google.maps.Polygon()).current;

  useEffect(() => {
    if (!map) {
      return;
    }
    polyline.setMap(map);
    polyline.setOptions({
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      paths,
    });

    return () => {
      polyline.setMap(null);
    };
  }, [
    fillColor,
    fillOpacity,
    map,
    paths,
    polyline,
    strokeColor,
    strokeOpacity,
    strokeWeight,
  ]);

  return null;
};
