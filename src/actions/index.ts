// import * as constants from "../constants";

export interface AddScreenshot {
  type: "ADD_SCREENSHOT";
  payload: {
    data: string;
  };
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
  | SetupGame 
  | SetClock
  | DecrementClock
  | NextWord
  | IncreaseScore;

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
