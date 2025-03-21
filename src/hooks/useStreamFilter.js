import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideStreamAction, showStreamAction } from '../reducers/streamFilter';

export const useStreamFilter = () => {
  const dispatch = useDispatch();
  const { hidenStreams } = useSelector((state) => state.streamFilter);

  const toggleStreamVisibility = useCallback(
    (id) => {
      if (hidenStreams.includes(id)) {
        dispatch(showStreamAction(id));
      } else {
        dispatch(hideStreamAction(id));
      }
    },
    [hidenStreams, dispatch]
  );

  const shouldHideStream = useCallback((id) => hidenStreams.includes(id), [
    hidenStreams,
  ]);

  return {
    hidenStreams,
    toggleStreamVisibility,
    shouldHideStream,
  };
};
