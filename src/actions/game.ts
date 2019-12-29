export interface RecognizeImage {
  type: "RECOGNIZE_IMAGE";
  payload: {
    data: string;
  };
}

export interface FetchingRecognition {
  type: "FETCHING_RECOGNITION",
  payload: boolean
}

export interface RecognitionError {
  type: "RECOGNITION_ERROR",
  payload: boolean
}

export interface AddScreenshot {
  type: "ADD_SCREENSHOT",
  payload: {
    data: string
  }
}

export interface SetupGame {
  type: "SETUP_GAME";
}

export interface SetClock {
  type: "SET_CLOCK";
  payload: {
    value: number
  }
}

export interface DecrementClock {
  type: "DECREMENT_CLOCK";
}

export interface NextWord {
  type: "NEXT_WORD";
  payload: {
    winner: string
  }
}

export interface IncreaseScore {
  type: "INCREASE_SCORE";
}

export interface RecognitionLabels {
  type: "RECOGNITION_LABELS";
  payload: any;
}

export interface UpdateLobby {
  type: "UPDATE_LOBBY",
  payload: any
}

export interface SocketConnect {
  type: "SOCKET_CONNECT"
}

export interface SocketDisconnect {
  type: "SOCKET_DISCONNECT"
}

export type ApplicationActionTypes =
  | AddScreenshot
  | RecognizeImage
  | FetchingRecognition
  | RecognitionError
  | SetupGame
  | SetClock
  | DecrementClock
  | NextWord
  | IncreaseScore
  | RecognitionLabels
  | UpdateLobby 
  | SocketConnect
  | SocketDisconnect;

export const recognizeImage = (data: string) => ({
  type: "RECOGNIZE_IMAGE",
  payload: data
});

export const fetchingRecognition = (status: boolean) => ({
  type: "FETCHING_RECOGNITION",
  payload: status
});

export const recognitionError = (status: boolean) => ({
  type: "RECOGNITION_ERROR",
  payload: status
});

export const addScreenshot = (data: string) => ({
  type: "ADD_SCREENSHOT",
  payload: data
});

export const setupGame = () => ({
  type: "SETUP_GAME",
})

export const setClock = (value: number) => ({
  type: "SET_CLOCK",
  payload: { value },
})

export const nextWord = (winner: string) => ({
  type: "NEXT_WORD",
  payload: { winner }
})

export const increaseScore = () => ({
  type: "INCREASE_SCORE",
})

export const recognitionLabels = (labels: any) => ({
  type: "RECOGNITION_LABELS",
  payload: labels
})