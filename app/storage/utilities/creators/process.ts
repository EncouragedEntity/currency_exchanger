import { ActionCreatorWithPreparedPayload, createAction } from '@reduxjs/toolkit';

export default <K = string | number, T extends string = string>(type: T) => {
  type Key = K | Array<K | undefined>;

  type Options = { ids?: Array<K | undefined> };

  type Values = { [key: string]: boolean };

  const keygen = (key: Key): string => Array<K | undefined>().concat(key).join('.');

  const prepare = (key: K, value: boolean, options?: Options) => {
    const payload = { [keygen(key)]: value };

    if (options?.ids) options.ids.forEach(id => {
      if (key) Object.assign(payload, { [keygen([key, id])]: value });
    });

    return { type, payload };
  };

  const getter = (values: Values, key: Key) => values[keygen(key)] ?? false;

  type Action = ActionCreatorWithPreparedPayload<
    Parameters<typeof prepare>,
    ReturnType<typeof prepare>['payload'],
    T
  >;

  const action = createAction(type, prepare) as Action & {
    (...args: Parameters<Action>): ReturnType<Action>;
    get: typeof getter;
  };

  action.get = getter;

  return action;
};