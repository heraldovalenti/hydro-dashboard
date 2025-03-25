import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateZoomAndCenterAction } from '../reducers/mapPosition';

export const useMapPosition = () => {
  const dispatch = useDispatch();
  const { zoom: initialZoom, center: initialCenter } = useSelector(
    (state) => state.mapPosition
  );
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
  // TODO: remove this ref once migrated to new maps API
  const mapPosition = { zoom: initialZoom, center: initialCenter };
  return {
    mapPosition,
    initialZoom,
    initialCenter,
    updateZoomAndCenter,
  };
};
