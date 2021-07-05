import { all } from 'redux-saga/effects';
import { onAccumulationData } from './accumulations';
import { onLatestObservationsRequest } from './latestObservations';

export default function* rootSaga() {
  yield all([onLatestObservationsRequest(), onAccumulationData()]);
}
