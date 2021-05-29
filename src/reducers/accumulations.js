const initialState = {
  loading: false,
  accumulationData: [],
};

const SET_LOADING_ACCUMULATION_DATA_ACTION =
  'SET_LOADING_ACCUMULATION_DATA_ACTION';
const SET_ACCUMULATION_DATA_ACTION = 'SET_ACCUMULATION_DATA_ACTION';

const startLoadingAccumulationData = () => {
  return {
    type: SET_LOADING_ACCUMULATION_DATA_ACTION,
    data: {
      loading: true,
    },
  };
};

const endLoadingAccumulationData = () => {
  return {
    type: SET_LOADING_ACCUMULATION_DATA_ACTION,
    data: {
      loading: false,
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

export const accumulationDataReducer = (
  state = initialState,
  { type, data }
) => {
  switch (type) {
    case SET_LOADING_ACCUMULATION_DATA_ACTION:
      const { loading } = data;
      return {
        ...state,
        loading,
      };
    case SET_ACCUMULATION_DATA_ACTION:
      const { accumulationData } = data;
      return {
        ...state,
        loading: false,
        accumulationData,
      };
    default:
      return { ...state };
  }
};

export const accumulationDataActions = {
  startLoadingAccumulationData,
  endLoadingAccumulationData,
  setAccumulationData,
};
