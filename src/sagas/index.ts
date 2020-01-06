import { all } from 'redux-saga/effects';

import {setupGameWatcher, startClockWatcher, getLabelsWatcher} from "./game";
import { socketConnectWatcher, socketDisconnectWatcher } from "./socket";
import { startMatchMakingWatcher, cancelMatchMakingWatcher } from "./lobby";

export default function* rootSaga() {
  yield all([
    setupGameWatcher(),
    startClockWatcher(),
    getLabelsWatcher(),
    socketConnectWatcher(),
    socketDisconnectWatcher(),
    startMatchMakingWatcher(),
    cancelMatchMakingWatcher()
  ])
}