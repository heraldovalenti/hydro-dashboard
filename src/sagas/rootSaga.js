import { all } from 'redux-saga/effects';
import { watchLatestObservationsRequest } from './latestObservations';

export default function* rootSaga() {
  yield all([
    watchLatestObservationsRequest(),
    // otherSaga()
  ]);
}
