import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';
import { intervalFilterReducer } from './intervalFilter';
import { accumulationDataReducer } from './accumulations';

const reducerMap = {
  mapFilter: mapFilterReducer,
  intervalFilter: intervalFilterReducer,
  accumulationData: accumulationDataReducer,
};

export default combineReducers(reducerMap);
