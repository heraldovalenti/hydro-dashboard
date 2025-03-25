import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateZoomAndCenterAction,
  initialCenter,
  initialZoom,
} from '../reducers/mapPosition';

export const useMapPosition = () => {
  const dispatch = useDispatch();
  const { zoom, center } = useSelector((state) => state.mapPosition);
  const updateZoomAndCenter = useCallback(
    ({ zoom, center }) => {
      dispatch(
        updateZoomAndCenterAction({
          zoom,
          center,
        })
      );
    },
    [dispatch]
  );
  return {
    zoom,
    center,
    initialZoom,
    initialCenter,
    updateZoomAndCenter,
  };
};
