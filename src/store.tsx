import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';
import { FC, PropsWithChildren } from 'react';

const reduxStore = createStore(rootReducer);

export type AppStore = typeof reduxStore;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
