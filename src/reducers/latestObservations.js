import {
  flowDimension,
  levelDimension,
  rainDimension,
} from '../components/StationInfo/stationUtil';

const initialState = {
  latestObservations: {
    [levelDimension]: [],
    [flowDimension]: [],
    [rainDimension]: [],
  },
  loading: false,
};

export const LATEST_OBSERVATIONS_REQUEST = 'LATEST_OBSERVATIONS_REQUEST';
export const LATEST_OBSERVATIONS_SUCCESS = 'LATEST_OBSERVATIONS_SUCCESS';
export const LATEST_OBSERVATIONS_FAIL = 'LATEST_OBSERVATIONS_FAIL';

const latestObservationsRequest = (dateFrom, dateTo) => {
  return {
    type: LATEST_OBSERVATIONS_REQUEST,
    payload: { dateFrom, dateTo },
  };
};

const latestObservationsSuccess = (latestObservations) => {
  return {
    type: LATEST_OBSERVATIONS_SUCCESS,
    payload: { latestObservations },
  };
};

const latestObservationsFail = (error) => {
  return {
    type: LATEST_OBSERVATIONS_FAIL,
    payload: { error },
  };
};

export const latestObservationsActions = {
  latestObservationsRequest,
  latestObservationsSuccess,
  latestObservationsFail,
};

export const latestObservationsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LATEST_OBSERVATIONS_REQUEST:
      return { ...state, loading: true };
    case LATEST_OBSERVATIONS_SUCCESS:
      const { latestObservations } = payload;
      return { latestObservations, loading: false };
    case LATEST_OBSERVATIONS_FAIL:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
