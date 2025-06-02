import { all, fork } from 'redux-saga/effects';

export default function*() {
  yield all([
    fork(require('app/modules/currency').saga),
  ]);
};