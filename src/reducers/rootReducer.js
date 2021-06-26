import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';
import { intervalFilterReducer } from './intervalFilter';
import { accumulationDataReducer } from './accumulations';
import { latestObservationsReducer } from './latestObservations';

const reducerMap = {
  mapFilter: mapFilterReducer,
  intervalFilter: intervalFilterReducer,
  accumulationData: accumulationDataReducer,
  latestObservations: latestObservationsReducer,
};

export default combineReducers(reducerMap);
