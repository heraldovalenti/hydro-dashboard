import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
  flowDimension,
  levelDimension,
} from '../components/StationInfo/stationUtil';
import {
  LATEST_OBSERVATIONS_REQUEST,
  latestObservationsActions,
} from '../reducers/latestObservations';
import { fetchLatestbservations } from '../services/backend';

export function* onLatestObservationsRequest() {
  yield takeEvery(LATEST_OBSERVATIONS_REQUEST, latestObservationRequest);
}

function* latestObservationRequest(action) {
  try {
    const { dateFrom, dateTo } = action.payload;
    const latestObservations = yield all([
      call(fetchLatestbservations, levelDimension, dateFrom, dateTo),
      call(fetchLatestbservations, flowDimension, dateFrom, dateTo),
    ]);
    const [levelObservations, flowObservations] = latestObservations;
    yield put(
      latestObservationsActions.latestObservationsSuccess({
        [levelDimension]: levelObservations,
        [flowDimension]: flowObservations,
      })
    );
  } catch (error) {
    yield put(latestObservationsActions.latestObservationsFail(error));
  }
}
