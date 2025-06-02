/* eslint-disable no-console */
import { Action, configureStore, ThunkDispatch, Tuple } from '@reduxjs/toolkit';

import { persistStore } from './persist';
import reducer from './reducer';
import { runSaga } from './runner';
import sagas from './sagas';

type State = ReturnType<typeof reducer>;

const createSagaMiddleware = require('redux-saga').default as typeof import('redux-saga').default;

const sagaMiddleware = createSagaMiddleware<State>();

const middlewares = new Tuple(sagaMiddleware);


const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    actionCreatorCheck: true,
    serializableCheck: false,
    immutableCheck: false,
    thunk: true as any,
  }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'production' ? false : {
    name: require('../../package.json').name,
  },
});

const persistor = persistStore(store);

runSaga(sagaMiddleware, sagas);

export type Storage = ReturnType<typeof store.getState>;

export type Dispatch = ThunkDispatch<Storage, any, Action<string>>;

export { Provider } from 'react-redux';

export { store as default, persistor };