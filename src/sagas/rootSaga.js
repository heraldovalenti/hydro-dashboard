import { all } from 'redux-saga/effects';
import { onLatestObservationsRequest } from './latestObservations';

export default function* rootSaga() {
  yield all([
    onLatestObservationsRequest(),
    // otherSaga()
  ]);
}
