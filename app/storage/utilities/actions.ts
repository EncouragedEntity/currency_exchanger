import { createAction } from './creators';

const store = {
  reset: createAction('[ROOT][STORE][RESET]'),
} as const;

const appstate = {
  active: createAction('[ROOT][APPSTATE][ACTIVE]'),
  inactive: createAction('[ROOT][APPSTATE][INACTIVE]'),
  background: createAction('[ROOT][APPSTATE][BACKGROUND]'),
} as const;

const response = {
  401: createAction('[ROOT][RESPONSE][STATUS][401]'),
} as const;

const auth = {
  authorized: createAction('[ROOT][AUTH][AUTHORIZED]'),
  unauthorized: createAction('[ROOT][AUTH][UNAUTHORIZED]'),
} as const;

const language = {
  initialized: createAction('[ROOT][LANGUAGE][INITIALIZED]'),
  changed: createAction('[ROOT][LANGUAGE][CHANGED]'),
} as const;

export default { store, appstate, response, auth, language };