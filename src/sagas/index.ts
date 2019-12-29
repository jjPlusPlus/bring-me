import { all } from 'redux-saga/effects';

import {setupGameWatcher, startClockWatcher, getLabelsWatcher} from "./game";
import { socketConnectWatcher } from "./socket";

export default function* rootSaga() {
  yield all([
    setupGameWatcher(),
    startClockWatcher(),
    getLabelsWatcher(),
    socketConnectWatcher(),
  ])
}