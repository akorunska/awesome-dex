import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import createRootReducer from "./redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];

const enhancers = [];

function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares), ...enhancers)
  );

  return store;
}

const store = configureStore({});

export function getStore() {
  return store;
}
