import { combineReducers } from 'redux';
import { mapFilterReducer } from './mapFilter';

const reducerMap = {
  mapFilter: mapFilterReducer,
};

export default combineReducers(reducerMap);
