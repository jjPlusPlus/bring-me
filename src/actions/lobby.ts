import { any } from "prop-types";

export const updateLobby = (state: any) => ({
  type: "UPDATE_LOBBY",
  payload: {
    state: state
  }
});

export const startMatchMaking = () => ({
  type: "START_MATCHMAKING",
});

export const cancelMatchMaking = () => ({
  type: "CANCEL_MATCHMAKING",
});