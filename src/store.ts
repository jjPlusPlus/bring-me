import { applyMiddleware, compose, createStore } from "redux";
import { logger } from "redux-logger";
import { createBrowserHistory } from 'history';

import { AppState } from "./types";

import createRootReducer from "./reducers";
import rootSaga from "./sagas";

import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory()


export default function configureStore() {

  const store = createStore<any, any, any, any>(
    createRootReducer(history),
    compose(
      applyMiddleware(
        logger, 
        sagaMiddleware,
        routerMiddleware(history)
      ),
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
