import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';
import { intervalFilterReducer } from './intervalFilter';
import { mapPositionReducer } from './mapPosition';
import { basinFilterReducer } from './basinFilter';

const reducerMap = {
  mapFilter: mapFilterReducer,
  intervalFilter: intervalFilterReducer,
  mapPosition: mapPositionReducer,
  basinFilter: basinFilterReducer,
};

export default combineReducers(reducerMap);
