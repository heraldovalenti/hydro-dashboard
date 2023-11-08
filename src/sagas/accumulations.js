import { takeEvery, put, call } from 'redux-saga/effects';
import {
  accumulationDataActions,
  ACCUMULATION_REQUEST,
} from '../reducers/accumulations';
import { fetchAccumulationData } from '../services/backend';

export function* onAccumulationData() {
  yield takeEvery(ACCUMULATION_REQUEST, accumulationData);
}

function* accumulationData(action) {
  try {
    const { dateFrom, dateTo } = action.payload;
    const accumulationDataResponse = yield call(
      fetchAccumulationData,
      dateFrom,
      dateTo
    );
    yield put(
      accumulationDataActions.accumulationDataSuccess(accumulationDataResponse)
    );
  } catch (error) {
    yield put(accumulationDataActions.accumulationDataFail(error));
  }
}
