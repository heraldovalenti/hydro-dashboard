import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';
import { intervalFilterReducer } from './intervalFilter';
import { mapPositionReducer } from './mapPosition';
import { basinFilterReducer } from './basinFilter';
import { streamFilterReducer } from './streamFilter';
import { mapStyleReducer } from './mapStyle';

const reducerMap = {
  mapFilter: mapFilterReducer,
  intervalFilter: intervalFilterReducer,
  mapPosition: mapPositionReducer,
  basinFilter: basinFilterReducer,
  streamFilter: streamFilterReducer,
  mapStyle: mapStyleReducer,
};

export const rootReducer = combineReducers(reducerMap);
