import { put, takeLatest, all, select, delay } from 'redux-saga/effects';
import { Predictions } from 'aws-amplify';

var dataUriToBuffer = require('data-uri-to-buffer');

function* getLabelsSaga(data:any) {

  // first, add the screenshot to the store
  yield put ({ type: "ADD_SCREENSHOT", payload: data.payload});

  // convert image to buffer from base64
  let buffer = dataUriToBuffer(data.payload)
  let bytes = new Uint8Array(buffer);

  // fire off action to set loading state for labels
  yield put ( { type: "FETCHING_RECOGNITION", payload: true });

  // hit the Rekognition API
  let labels = yield Predictions.identify({
    labels: {
      source: { bytes },
      type: "LABELS"
    }
  });

  // if the api call succeeded, add the labels
  if (labels) {
    console.log(labels);
    yield put({ type: "RECOGNITION_LABELS", payload: labels.labels});
    yield put({ type: "FETCHING_RECOGNITION", payload: false });

    // fetch the current word from state
    let words = yield select((state) => state.Game.words);
    let currentWordIndex = yield select((state) => state.Game.currentWordIndex);
    const currentWord = words[currentWordIndex].text;

    // check the labels for a match against the current word in the game logic
    // by string-matching each returned label's 'name' against the current word
    const match = labels.labels.filter((label: any) => {
      return label.name === currentWord;
    });

    // if there is a match, increase the score, set the next word
    if (match.length) {
      console.log(match);
      yield put({ type: "NEXT_WORD", payload: { winner: "JJ" } });
      yield put({ type: "START_CLOCK" });
      yield put({ type: "INCREASE_SCORE" });
    } else {
      // let the user know that there was no match
    }

  } else {
    // if there was an error, set the error state
    yield put({ type: "RECOGNITION_ERROR", payload: true });
    yield put({ type: "FETCHING_RECOGNITION", payload: false });
  }
}

function* startClockSaga() {
  yield put ({ type: "SET_CLOCK", payload: 60 });
  let time = yield select((state) => state.Game.timer);
  
  while (time > 0) {
    time = yield select((state) => state.Game.timer);
    yield put( { type: "DECREMENT_CLOCK" });
    yield delay(1000);
  }

  if (time === 0) {
    yield put({ type: "NEXT_WORD", payload: { winner: null } });
    yield put({ type: "START_CLOCK" });
  }
}

function* setupGameSaga() {
  yield put({ type: "START_CLOCK" });
}

function* getLabelsWatcher() {
  yield takeLatest("RECOGNIZE_IMAGE", getLabelsSaga);
}
function* startClockWatcher() {
  yield takeLatest("START_CLOCK", startClockSaga);
}

function* setupGameWatcher() {
  yield takeLatest("SETUP_GAME", setupGameSaga);
}

export default function* rootSaga() {
  yield all([
    setupGameWatcher(),
    startClockWatcher(),
    getLabelsWatcher(),
  ])
}