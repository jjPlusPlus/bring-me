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
      { text: 'Person', winner: null },
      { text: 'Egg', winner: null },
      { text: 'Dog', winner: null },
      { text: 'Pillow', winner: null },
      { text: 'Jacket', winner: null },
    ],
    currentWordIndex: 0,
  },
  Recognition: {
    fetching: false,
    labels: [],
    error: '',
  },
  Player: {
    id: 'JJ',
    username: 'Jj',
    email: 'email@gmail.com',
    stats: { wins: 0, losses: 0 },
  },
  Lobby: {
    offline: [],
    online: [],
    matchMakingQueue: {
      groups: [],
      waiting: []
    },
    matches: []
  }
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

      // immutable copy of the words array
      const newWords = state.Game.words.slice();
      // set the winner if there was one
      // this reducer would have it as action.payload.winner
      newWords[index].winner = action.payload.winner;
  
      // increase the index if it's not the last word, otherwise set it to the first word
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
          words: newWords
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

    case "FETCHING_RECOGNITION": {
      return {
        ...state,
        Recognition: {
          ...state.Recognition,
          fetching: action.payload
        }
      }
    }

    case "RECOGNITION_ERROR": {
      return {
        ...state,
        Recognition: {
          ...state.Recognition,
          error: action.payload
        }
      }
    }

    case "RECOGNITION_LABELS": {
      return {
        ...state,
        Recognition: {
          ...state.Recognition,
          labels: action.payload,
        }
      }
    }

    case "UPDATE_LOBBY": {
      return {
        ...state,
        Lobby: action.payload.state,
      }
    }

    default:
      return state;
  }
};

export default reducer;
