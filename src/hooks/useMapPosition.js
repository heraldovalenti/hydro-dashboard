import { useCallback, useRef } from 'react';
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
  const mapPosition = useRef({ zoom: initialZoom, center: initialCenter })
    .current;
  return {
    mapPosition,
    initialZoom,
    initialCenter,
    updateZoomAndCenter,
  };
};
