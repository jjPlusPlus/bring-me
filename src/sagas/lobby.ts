import { takeLatest, select } from "redux-saga/effects";
import { Auth } from 'aws-amplify';

function* startMatchMakingSaga() {
  const player = yield Auth.currentAuthenticatedUser();
  const uuid = player.attributes['sub'];
  // send a message to the socket lobby channel to disconnect the user
  const readyMessage = JSON.stringify({
    type: "PLAYER_READY",
    player: {id: uuid, name: player.username},
  });
  let wsocket = yield select((state) => state.LobbySocket);
  yield wsocket.send(readyMessage);
  return;
}

function* cancelMatchMakingSaga() {
  const player = yield Auth.currentAuthenticatedUser();
  const uuid = player.attributes['sub'];
  // send a message to the socket lobby channel to disconnect the user
  const cancelMessage = JSON.stringify({
    type: "PLAYER_CANCEL",
    player: { id: uuid, name: player.username },
  });
  let wsocket = yield select((state) => state.LobbySocket);
  yield wsocket.send(cancelMessage);
  return;
}

export function* startMatchMakingWatcher() {
  yield takeLatest("START_MATCHMAKING", startMatchMakingSaga);
}

export function* cancelMatchMakingWatcher() {
  yield takeLatest("CANCEL_MATCHMAKING", cancelMatchMakingSaga);
}