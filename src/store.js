import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

export default ({ children }) => {
  const reduxStore = createStore(rootReducer);
  return <Provider store={reduxStore}>{children}</Provider>;
};
