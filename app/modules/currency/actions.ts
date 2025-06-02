import { createAction, createProcessAction } from 'app/storage/utilities';
import { actions as global } from 'app/storage/utilities';
import type { State } from './types';

export { global };

export const request = {
  list: createAction<{
    target?: string;
    sybmols?: Array<string>;
    expand?: 0 | 1;
  }, void>('[CURRENCY][LIST][REQUEST]'),
  favorites: createAction<{
    currency: string;
    favorite: boolean;
  }, void>('[CURRENCY][FAVORITES][REQUEST]'),
} as const;

export const reduce = {
  favorites: createAction<Pick<State, 'favorites'>>('[CURRENCY][FAVORITES][REDUCE]'),
  list: createAction<Pick<State, 'list'>>('[CURRENCY][LIST][REDUCE]'),
  events: createProcessAction('[CURRENCY][EVENTS][REDUCE]'),
} as const;

export default request;
