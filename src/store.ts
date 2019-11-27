import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";

import { AppState } from "./types";

import rootReducer from "./reducers";
// import rootSaga from "./sagas";

// import createSagaMiddleware from "redux-saga";
// const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {

  const store = createStore<AppState, any, any, any>(
    rootReducer,
    applyMiddleware(logger),
  );

  // sagaMiddleware.run(rootSaga);

  return store;
}
