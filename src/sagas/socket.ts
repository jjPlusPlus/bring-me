import { put, call, take, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import { eventChannel } from "redux-saga";
import { Auth } from "aws-amplify";


let wsocket: any; 

function* createLobbyChannel(socket: any) {
  return eventChannel((emit) => {
    socket.onmessage = (message: any) => {
      emit({ type: "SOCKET_MESSAGE", socket, payload: message.data });
    }
    socket.onopen = () => {
      emit({ type: "SOCKET_OPENED", socket });
    }
    return () => {
      socket.close();
    }
  })
}

function* socketConnectSaga(action: any) {

  wsocket = new WebSocket(action.host);
  const channel = yield call(createLobbyChannel, wsocket);

  yield put({ type: "SET_SOCKET", payload: wsocket });

  while (true) {
    const { type, socket, payload } = yield take(channel);

    switch (type) {
      case "SOCKET_MESSAGE":
        yield socketOnMessage(payload);
        break;
      case "SOCKET_OPENED":
        yield socketOnOpen(socket);
        break;
      case "SOCKET_CLOSED":
        console.log('socket closed');
        break;
      default:
        break;
    } 
  }
}

function* socketOnMessage(event: any) {
  const message = JSON.parse(event);
  switch (message.type) {
    case "UPDATE_LOBBY":
      yield put({ type: "UPDATE_LOBBY", payload: message.state});
      break;
    case "NEW_MATCH": 
      const { channel, players } = message.broadcast;
      const player = yield Auth.currentAuthenticatedUser();
      const uuid = player.attributes['sub'];

      // does the player's uuid match one of the players in the message?
      const enterMatch = players.filter((p: any) => p.id === uuid);
      if (enterMatch) {
        // update react history to go to /match/:channelID
        yield put(push("/match/" + channel.name + "/" + channel.port));
      }
      break;
    default:
      console.log('message type not handled.');
      break;
  }
}

function* socketOnOpen(socket: any) {
  const player = yield Auth.currentAuthenticatedUser();
  const uuid = player.attributes['sub'];
  const socketMessage = JSON.stringify({
    type: "JOIN_LOBBY",
    player: {
      id: uuid,
      name: player.username
    }
  });

  yield socket.send(socketMessage);
}

// the user initiated a disconnection 
function* socketDisconnectSaga() {
  const player = yield Auth.currentAuthenticatedUser();
  const uuid = player.attributes['sub'];
  // send a message to the socket lobby channel to disconnect the user
  const disconnectMessage = JSON.stringify({
    type: "PLAYER_DISCONNECTED",
    player: uuid,
  });
  yield wsocket.send(disconnectMessage);
  // then clean up the connection
  // yield wsocket.close();
}

export function* socketConnectWatcher() {
  yield takeEvery("SOCKET_CONNECT", socketConnectSaga);
}

export function* socketDisconnectWatcher() {
  yield takeLatest("SOCKET_DISCONNECT", socketDisconnectSaga);
}