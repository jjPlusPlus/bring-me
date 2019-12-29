import { any } from "prop-types";

export const updateLobby = (state: any) => ({
  type: "UPDATE_LOBBY",
  payload: {
    state: state
  }
});