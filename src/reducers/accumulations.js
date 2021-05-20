const initialState = {
  dateFrom: null,
  dateTo: null,
  loading: false,
  accumulationData: [],
};

const SET_INTERVAL_ACTION = 'SET_INTERVAL_ACTION';
const SET_ACCUMULATION_DATA_ACTION = 'SET_ACCUMULATION_DATA_ACTION';
const SET_INTERVAL_AND_ACCUMULATION_DATA_ACTION =
  'SET_INTERVAL_AND_ACCUMULATION_DATA_ACTION';

const setAccumulationInterval = ({ dateFrom, dateTo }) => {
  return {
    type: SET_INTERVAL_ACTION,
    data: {
      dateFrom,
      dateTo,
    },
  };
};

const setAccumulationData = ({ accumulationData }) => {
  return {
    type: SET_ACCUMULATION_DATA_ACTION,
    data: {
      accumulationData,
    },
  };
};

const setIntervalAndAccumulationData = ({
  dateFrom,
  dateTo,
  accumulationData,
}) => {
  return {
    type: SET_INTERVAL_AND_ACCUMULATION_DATA_ACTION,
    data: {
      dateFrom,
      dateTo,
      accumulationData,
    },
  };
};

export const accumulationDataReducer = (
  state = initialState,
  { type, data = {} }
) => {
  const { dateFrom, dateTo, accumulationData } = data;
  switch (type) {
    case SET_INTERVAL_ACTION:
      if (state.loading) {
        // if loading, do not accept update and return state as it is
        return { ...state };
      }
      return {
        ...state,
        loading: true,
        dateFrom,
        dateTo,
      };
    case SET_ACCUMULATION_DATA_ACTION:
      return {
        ...state,
        loading: false,
        accumulationData,
      };
    case SET_INTERVAL_AND_ACCUMULATION_DATA_ACTION:
      return {
        ...state,
        loading: false,
        dateFrom,
        dateTo,
        accumulationData,
      };
    default:
      return { ...state };
  }
};

export const accumulationDataActions = {
  setAccumulationInterval,
  setAccumulationData,
  setIntervalAndAccumulationData,
};
