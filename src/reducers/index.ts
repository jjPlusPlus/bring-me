import { Reducer } from "redux";

import { AppState } from "../types";

// import * as constants from "../constants";

import { ApplicationActionTypes } from "../actions";


const initialState = {
  screenshot: {
    data: "poop"
  }
};

const reducer: Reducer = (state = initialState, action: ApplicationActionTypes) => {

  switch (action.type) {
    case "ADD_SCREENSHOT": {
      return {
        ...state,
        screenshot: action.payload
      };
    }

    default:
      return state;
  }
};

export default reducer;
