import { Reducer } from "redux";

import { AppState } from "../types";

// import * as constants from "../constants";

import { ApplicationActionTypes } from "../actions";


const initialState = {
  Camera: {
    active: false,
    screenshot: '',
  },
  Game: {
    timer: 0,
    score: 0,
    words: [ 
      { text: 'Person'},
      { text: 'Egg'},
      { text: 'Dog'},
      { text: 'Pillow'},
      { text: 'Jacket'},
    ],
    currentWordIndex: 0,
  },
  Recognition: {
    fetching: false,
    labels: [],
    error: '',
  },
  Player: {
    username: 'Jj',
    email: 'email@gmail.com',
    stats: { wins: 0, losses: 0 },
  },
};

/* GAME LOGIC STUFF:
 * SET_CLOCK (set a timer to 60)
 * START_CLOCK (set a timer using a saga every 1s)
 * DECREMENT_CLOCK (reduce clock number by 1)
 * INCREASE_SCORE (increase current score by 100 for now)
 * NEXT_WORD (each time the next word comes up, SET_CLOCK(60) SET_WORD(next word in words array))
 * SKIP_WORD (fires off NEXT_WORD)
 * RESET_GAME (this one might even fire off SET_SCORE(0) SET_CLOCK(60)
*/

/* REKOGNITION STUFF:
 * FETCH_REKOGNITION (hit the rekognition API)
 * REKOGNITION_ERROR (show error state)
 * REKOGNITION_LABELS (success- set the labels with the returned value from the API)
*/

const reducer: Reducer = (state = initialState, action: ApplicationActionTypes) => {

  switch (action.type) {
    case "ADD_SCREENSHOT": {
      return {
        ...state,
        Camera: {
          screenshot: action.payload
        }
      };
    }

    case "SET_CLOCK": {
      return {
        ...state,
        Game: {
          ...state.Game,
          timer: action.payload,
        }
      }
    }

    case "DECREMENT_CLOCK": {
      const newTime = state.Game.timer - 1;
      return {
        ...state,
        Game: {
          ...state.Game,
          timer: newTime
        }
      }
    }

    case "SETUP_GAME": {
      return {
        ...state,
        Game: {
          ...state.Game,
          timer: 60,
          score: 0
        }
      }
    }

    case "NEXT_WORD": {
      let index = state.Game.currentWordIndex;
      if (index < state.Game.words.length - 1) {
        index = index + 1;
      } else {
        index = 0;
      }
      return {
        ...state,
        Game: {
          ...state.Game,
          currentWordIndex: index,
          timer: 60,
        }
      }
    }

    case "INCREASE_SCORE": {
      const newScore = state.Game.score + 100;
      return {
        ...state,
        Game: {
          ...state.Game,
          score: newScore
        }
      }
    }

    default:
      return state;
  }
};

export default reducer;
