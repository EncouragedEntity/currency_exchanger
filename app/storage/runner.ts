/* eslint-disable import/prefer-default-export */
import type { Saga, SagaMiddleware, Task } from 'redux-saga';

export const runSaga = (() => {
  let runner: Task<any> | undefined;

  return <C extends object = {}>(middleware: SagaMiddleware<C>, saga: Saga) => {
    if (__DEV__) runner?.cancel();

    runner = middleware.run(saga);
  };
})();