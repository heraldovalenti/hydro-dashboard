const initialState = {
  latestObservations: {},
  loading: false,
};

const LATEST_OBSERVATIONS_REQUEST = 'LATEST_OBSERVATIONS_REQUEST';
const LATEST_OBSERVATIONS_SUCCESS = 'LATEST_OBSERVATIONS_SUCCESS';
const LATEST_OBSERVATIONS_FAIL = 'LATEST_OBSERVATIONS_FAIL';

const latestObservationsRequest = (dimensionId) => {
  return {
    type: LATEST_OBSERVATIONS_REQUEST,
    data: { dimensionId },
  };
};

const latestObservationsSuccess = (dimensionId, observations) => {
  return {
    type: LATEST_OBSERVATIONS_SUCCESS,
    data: { dimensionId, observations },
  };
};

const latestObservationsFail = () => {
  return {
    type: LATEST_OBSERVATIONS_FAIL,
  };
};

export const latestObservationsActions = {
  latestObservationsRequest,
  latestObservationsSuccess,
  latestObservationsFail,
};

export const latestObservationsReducer = (
  state = initialState,
  { type, data }
) => {
  switch (type) {
    case LATEST_OBSERVATIONS_REQUEST:
      return { ...state, loading: true };
    case LATEST_OBSERVATIONS_SUCCESS:
      const { dimensionId, observations } = data;
      const latestObservations = {
        ...state.latestObservations,
        [dimensionId]: observations,
      };
      return { latestObservations, loading: false };
    case LATEST_OBSERVATIONS_FAIL:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
