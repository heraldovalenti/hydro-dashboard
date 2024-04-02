import { now, plusHours, roundToMinutes } from '../utils/date';
const initialHours = 24;
const initialState = {
  hours: initialHours,
  dateFrom: plusHours(roundToMinutes(now()), -initialHours),
  dateTo: roundToMinutes(now()),
};

const INTERVAL_FILTER_X_HOURS = 'INTERVAL_FILTER_X_HOURS';
const INTERVAL_FILTER_CUSTOM = 'INTERVAL_FILTER_CUSTOM';

const lastHours = (hours) => {
  return {
    type: INTERVAL_FILTER_X_HOURS,
    data: {
      hours,
      dateFrom: plusHours(now(), -hours),
      dateTo: now(),
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

export const updateIntervalAction = ({ hours, dateFrom, dateTo }) => {
  if (hours && hours > 0) {
    return lastHours(hours);
  } else {
    return customInterval({ dateFrom, dateTo });
  }
};

export const intervalFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVAL_FILTER_X_HOURS:
      const { hours } = action.data;
      const to = roundToMinutes(now(), 10);
      return {
        ...state,
        hours,
        dateFrom: plusHours(to, -hours),
        dateTo: to,
      };
    case INTERVAL_FILTER_CUSTOM:
      const { dateFrom, dateTo } = action.data;
      return {
        ...state,
        hours: 0, // zero hours means custom interval
        dateFrom: roundToMinutes(dateFrom, -10),
        dateTo: roundToMinutes(dateTo, 10),
      };
    default:
      return { ...state };
  }
};
