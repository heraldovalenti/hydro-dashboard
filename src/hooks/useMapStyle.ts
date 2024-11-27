import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  MapStyle,
  setMapStylesAction,
  setSelectedStyleAction,
} from '../reducers/mapStyle';
import { useCallback, useEffect, useMemo } from 'react';
import { usePersistentConfig } from './usePersistentConfig';

export const useMapStyle = () => {
  const dispatch = useDispatch();
  const { mapStyles, selectedStyle } = useSelector(
    ({ mapStyle: { mapStyles, selectedStyle } }: RootState) => ({
      mapStyles,
      selectedStyle,
    })
  );

  const styleIds = useMemo(() => mapStyles.map((style) => style.id), [
    mapStyles,
  ]);
  const [defaultStyle] = styleIds;

  const { isEmpty, config, updateConfig } = usePersistentConfig('MAP_STYLE');
  useEffect(() => {
    if (isEmpty && defaultStyle) {
      updateConfig(defaultStyle);
    }
  }, [defaultStyle, isEmpty, styleIds, updateConfig]);

  const updateSelectedStyle = useCallback(
    (selectedStyle: string) => {
      if (styleIds.includes(selectedStyle)) {
        dispatch(setSelectedStyleAction(selectedStyle));
        updateConfig(selectedStyle);
      } else if (defaultStyle) {
        dispatch(setSelectedStyleAction(defaultStyle));
        updateConfig(defaultStyle);
      }
    },
    [defaultStyle, dispatch, styleIds, updateConfig]
  );

  useEffect(() => {
    if (!selectedStyle) {
      updateSelectedStyle(config);
    }
  }, [config, selectedStyle, updateSelectedStyle]);

  const updateMapStyles = useCallback(
    (mapStyles: MapStyle[]) => {
      dispatch(setMapStylesAction(mapStyles));
    },
    [dispatch]
  );

  return {
    mapStyles,
    selectedStyle,
    updateMapStyles,
    updateSelectedStyle,
  };
};
