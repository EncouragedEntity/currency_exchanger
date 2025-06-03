import { AsyncStorage, createReducer, persistReducer } from 'app/storage/utilities';
import * as actions from './actions';
import type { State } from './types';

const initial = Object.seal<State>({
  events: {},
  list: {},
  favorites: {},
});

const reducer = createReducer(initial, builder => {
  builder.addCase(actions.global.store.reset, () => initial);

  builder.addCase(actions.global.auth.unauthorized, () => initial);

  builder.addCase(actions.reduce.events, (state, { payload }) => ({
    ...state,
    events: { ...state.events, ...payload },
  }));

  builder.addCase(actions.reduce.list, (state, { payload }) => ({
    ...state,
    list: payload.list,
  }));

  builder.addCase(actions.reduce.favorites, (state, { payload }) => ({
    ...state,
    favorites: payload.favorites,
  }));

});

export default persistReducer({
  key: 'currency',
  storage: AsyncStorage,
  blacklist: ['events'],
}, reducer);
