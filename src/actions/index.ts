// import * as constants from "../constants";

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
}

export interface IncreaseScore {
  type: "INCREASE_SCORE";
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
  | IncreaseScore;

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

export const nextWord = () => ({
  type: "NEXT_WORD",
})

export const increaseScore = () => ({
  type: "INCREASE_SCORE",
})

/*
  is there a way not to have to repeat everything?
*/
