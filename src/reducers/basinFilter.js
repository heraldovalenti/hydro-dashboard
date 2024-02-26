import { without } from 'lodash';

const HIDE_BASIN = 'basinFilter/HIDE_BASIN';
const SHOW_BASIN = 'basinFilter/SHOW_BASIN';

export const hideBasinAction = (id) => {
  return {
    type: HIDE_BASIN,
    payload: id,
  };
};

export const showBasinAction = (id) => {
  return {
    type: SHOW_BASIN,
    payload: id,
  };
};

const initialState = {
  hidenBasin: [],
};

export const basinFilterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HIDE_BASIN:
      return { ...state, hidenBasin: [...state.hidenBasin, payload] };
    case SHOW_BASIN:
      return { ...state, hidenBasin: without(state.hidenBasin, payload) };
    default:
      return { ...state };
  }
};
