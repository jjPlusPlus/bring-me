import { put, takeLatest, all, select, delay } from 'redux-saga/effects';

/*
  effect: something that happens as a result of something else

  setupGameSaga
    - start and keep track of timer
    - set score to 0
    - dynamically generate list of words
*/

function* startClockSaga() {
  yield put ({ type: "SET_CLOCK", payload: 60 });
  let time = yield select((state) => state.Game.timer);
  
  while (time > 0) {
    time = yield select((state) => state.Game.timer);
    yield put( { type: "DECREMENT_CLOCK" });
    yield delay(1000);
  }

  if (time === 0) {
    yield put({ type: "NEXT_WORD" });
    yield put({ type: "START_CLOCK" });
  }
}

function* startClockWatcher() {
  yield takeLatest("START_CLOCK", startClockSaga);
}

function* setupGameSaga() {
  // figure out how we're going to set up a new clock
  yield put({ type: "START_CLOCK" });

}

function* setupGameWatcher() {
  yield takeLatest("SETUP_GAME", setupGameSaga);
}

export default function* rootSaga() {
  yield all([
    setupGameWatcher(),
    startClockWatcher(),
  ])
}