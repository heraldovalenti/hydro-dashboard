import { put, takeEvery, call } from 'redux-saga/effects';
import {
  LATEST_OBSERVATIONS_REQUEST,
  latestObservationsActions,
} from '../reducers/latestObservations';
import { fetchLatestbservations } from '../services/backend';

export function* watchLatestObservationsRequest() {
  yield takeEvery(LATEST_OBSERVATIONS_REQUEST, latestObservationRequest);
}

function* latestObservationRequest(action) {
  try {
    const { dimensionId, dateFrom, dateTo } = action.payload;
    const observations = yield call(
      fetchLatestbservations,
      dimensionId,
      dateFrom,
      dateTo
    );
    yield put(
      latestObservationsActions.latestObservationsSuccess(
        dimensionId,
        observations
      )
    );
  } catch (error) {
    yield put(latestObservationsActions.latestObservationsFail(error));
  }
}
