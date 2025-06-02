import { createAction, PayloadActionCreator, ThunkAction } from '@reduxjs/toolkit';

export default <Payload = void, Return = object, T extends string = string>(type: T) => {
  type Creator = PayloadActionCreator<Payload extends void ? undefined : Payload, T>;

  interface Action {
    type: T,
    payload: Payload;
    resolve?: (value: Return | PromiseLike<Return>) => void
    reject?: (reason?: any) => void;
  }

  const action = createAction<Payload, T>(type) as Creator & {
    (...args: Parameters<Creator>): ReturnType<Creator> & Action;
    async: (payload: Payload) => ThunkAction<Promise<Return>, any, any, Action>;
  };

  action.async = payload => dispatch => new Promise<Return>((resolve, reject) => {
    return dispatch({ type, payload, resolve, reject });
  });

  return action;
};