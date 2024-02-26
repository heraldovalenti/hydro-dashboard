import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';
import { intervalFilterReducer } from './intervalFilter';
import { accumulationDataReducer } from './accumulations';
import { latestObservationsReducer } from './latestObservations';
import { mapPositionReducer } from './mapPosition';
import { basinFilterReducer } from './basinFilter';

const reducerMap = {
  mapFilter: mapFilterReducer,
  intervalFilter: intervalFilterReducer,
  accumulationData: accumulationDataReducer,
  latestObservations: latestObservationsReducer,
  mapPosition: mapPositionReducer,
  basinFilter: basinFilterReducer,
};

export default combineReducers(reducerMap);
