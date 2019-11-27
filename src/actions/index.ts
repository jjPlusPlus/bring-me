// import * as constants from "../constants";

export interface AddScreenshot {
  type: "ADD_SCREENSHOT";
  payload: {
    data: string;
  };
}

export interface RemoveScreenshot {
  type: "REMOVE_SCREENSHOT";
  payload?: {
    data: string;
  };
}

export type ApplicationActionTypes = AddScreenshot | RemoveScreenshot;

export const addScreenshot = (data: string) => ({
  type: "ADD_SCREENSHOT",
  payload: data
});
