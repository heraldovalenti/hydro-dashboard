const initialState = {
  loading: false,
  accumulationData: [],
  error: {},
};

export const ACCUMULATION_REQUEST = 'ACCUMULATION_REQUEST';
export const ACCUMULATION_SUCCESS = 'ACCUMULATION_SUCCESS';
export const ACCUMULATION_FAIL = 'ACCUMULATION_FAIL';

const accumulationDataRequest = (dateFrom, dateTo) => {
  return {
    type: ACCUMULATION_REQUEST,
    payload: {
      dateFrom,
      dateTo,
    },
  };
};

const accumulationDataSuccess = (accumulationData) => {
  return {
    type: ACCUMULATION_SUCCESS,
    payload: {
      accumulationData,
    },
  };
};

const accumulationDataFail = (error) => {
  return {
    type: ACCUMULATION_FAIL,
    payload: {
      error,
    },
  };
};

export const accumulationDataReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ACCUMULATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCUMULATION_SUCCESS:
      const { accumulationData } = payload;
      return {
        loading: false,
        accumulationData,
      };
    case ACCUMULATION_FAIL:
      const { error } = payload;
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return { ...state };
  }
};

export const accumulationDataActions = {
  accumulationDataRequest,
  accumulationDataSuccess,
  accumulationDataFail,
};
