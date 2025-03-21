import { useSelector, useDispatch } from 'react-redux';
import { updateIntervalAction } from '../reducers/intervalFilter';
import { useCallback } from 'react';

export const useDateInterval = () => {
  const dispatch = useDispatch();
  const updateInterval = useCallback(
    ({ hours, from, to }) => {
      dispatch(
        updateIntervalAction({
          hours,
          dateFrom: from,
          dateTo: to,
        })
      );
    },
    [dispatch]
  );
  const { dateFrom, dateTo, hours } = useSelector(
    (state) => state.intervalFilter
  );
  return {
    hours,
    from: dateFrom,
    to: dateTo,
    updateInterval,
  };
};
