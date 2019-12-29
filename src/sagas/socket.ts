import { put, call, take, takeLatest, takeEvery, select, delay } from 'redux-saga/effects';
import { eventChannel } from "redux-saga";

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

  const socket = new WebSocket(action.host);
  const channel = yield call(createLobbyChannel, socket);

  while (true) {
    const { type, socket, payload } = yield take(channel);

    switch (type) {
      case "SOCKET_MESSAGE":
        yield socketOnMessage(payload);
        break;
      case "SOCKET_OPENED":
        yield socketOnOpen(socket);
        break;
      default:
        break;
    }
    
  }
  // the server sent a message
  // socket.onmessage = yield socketOnMessage(action);

  // the server ended the connection  
  // socket.onclose = yield socketOnClose();

  // the server opened the connection
  // socket.onopen = yield socketOnOpen();
}

function* socketOnMessage(event: any) {
  const message = JSON.parse(event);
  console.log('socketOnMessage');
  switch (message.type) {
    case "UPDATE_LOBBY":
      // fire off an action to update the entire lobby state 
      // I think what happens here is that we get the entire state
      yield put({ type: "UPDATE_LOBBY", payload: message.state});
      break;
    default:
      console.log('message type not handled.');
      break;
  }
}

function* socketOnOpen(socket: any) {

  const socketMessage = JSON.stringify({
    type: "JOIN_LOBBY",
    player: {
      id: "f916cb08-c05a-41ec-ac39-ee42150026c4",
      name: "JJPlusPlus"
    }
  });

  yield socket.send(socketMessage);

  // ... we probably also want to get the current lobby state here
  // ... but the server will likely broadcast after receiving this.
}

// function* socketOnClose() {
//   socket = null;
// }

// the user initiated a disconnection 
function* socketDisconnectSaga(socket: any) {
  // send a message to the socket lobby channel to disconnect the user
  const disconnectMessage = JSON.stringify({
    command: "PLAYER_DISCONNECTED",
    player: "f916cb08-c05a-41ec-ac39-ee42150026c4",
  });
  yield socket.send(disconnectMessage);
  // then clean up the connection
  yield socket.close();
}

export function* socketConnectWatcher() {
  yield takeEvery("SOCKET_CONNECT", socketConnectSaga);
}

export function* socketDisconnectWatcher() {
  yield takeLatest("SOCKET_DISCONNECT", socketDisconnectSaga);
}