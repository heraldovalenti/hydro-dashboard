import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideBasinAction, showBasinAction } from '../reducers/basinFilter';

export const useBasinFilter = () => {
  const dispatch = useDispatch();
  const { hidenBasin } = useSelector((state) => state.basinFilter);

  const toggleBasinVisibility = useCallback(
    (id) => {
      if (hidenBasin.includes(id)) {
        dispatch(showBasinAction(id));
      } else {
        dispatch(hideBasinAction(id));
      }
    },
    [hidenBasin, dispatch]
  );

  const shouldHideBasin = useCallback((id) => hidenBasin.includes(id), [
    hidenBasin,
  ]);

  return {
    basinFilter: hidenBasin,
    toggleBasinVisibility,
    shouldHideBasin,
  };
};
