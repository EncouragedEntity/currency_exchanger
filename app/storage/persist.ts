import { Action, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { PersistConfig } from 'redux-persist/es/types';

declare module 'redux-persist/es/persistCombineReducers' {
  // eslint-disable-next-line max-len
  export default function persistCombineReducers<S, A extends Action = Action>(config: PersistConfig<S>, reducers: ReducersMapObject<S, A>): Reducer<S & PersistPartial, A>;
}

export { PersistGate } from 'redux-persist/integration/react';

export type { PersistGateProps } from 'redux-persist/integration/react';

export { persistStore, persistCombineReducers } from 'redux-persist';