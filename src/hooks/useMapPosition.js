import { useRef } from 'react';
import { useSelector } from 'react-redux';

export const useMapPosition = () => {
  const { zoom: initialZoom, center: initialCenter } = useSelector(
    (state) => state.mapPosition
  );
  const mapPosition = useRef({ zoom: initialZoom, center: initialCenter })
    .current;
  return {
    mapPosition,
    initialZoom,
    initialCenter,
  };
};
