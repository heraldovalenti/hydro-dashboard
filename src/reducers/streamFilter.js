import { without } from 'lodash';

const HIDE_FILTER = 'streamFilter/HIDE_STREAM';
const SHOW_FILTER = 'streamFilter/SHOW_STREAM';

export const hideStreamAction = (id) => {
  return {
    type: HIDE_FILTER,
    payload: id,
  };
};

export const showStreamAction = (id) => {
  return {
    type: SHOW_FILTER,
    payload: id,
  };
};

const initialState = {
  hidenStreams: [],
};

export const streamFilterReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case HIDE_FILTER:
      return { ...state, hidenStreams: [...state.hidenStreams, payload] };
    case SHOW_FILTER:
      return { ...state, hidenStreams: without(state.hidenStreams, payload) };
    default:
      return { ...state };
  }
};
