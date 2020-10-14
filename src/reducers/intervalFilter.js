import { now, plusHours } from '../utils/date';
const initialHours = 1;
const initialState = {
  hours: initialHours,
  dateFrom: plusHours(now(), -initialHours),
  dateTo: now(),
};

const INTERVAL_FILTER_X_HOURS = 'INTERVAL_FILTER_X_HOURS';
const INTERVAL_FILTER_CUSTOM = 'INTERVAL_FILTER_CUSTOM';

const lastHours = (hours) => {
  return {
    type: INTERVAL_FILTER_X_HOURS,
    data: {
      hours,
    },
  };
};

const customInterval = ({ dateFrom, dateTo }) => {
  return {
    type: INTERVAL_FILTER_CUSTOM,
    data: {
      dateFrom,
      dateTo,
    },
  };
};

export const intervalFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVAL_FILTER_X_HOURS:
      const { hours } = action.data;
      return {
        ...state,
        hours,
        dateFrom: plusHours(now(), -hours),
        dateTo: now(),
      };
    case INTERVAL_FILTER_CUSTOM:
      const { dateFrom, dateTo } = action.data;
      return {
        ...state,
        hours: 0, // zero hours means custom interval
        dateFrom,
        dateTo,
      };
    default:
      return { ...state };
  }
};

export const intervalFilterActions = { lastHours, customInterval };
