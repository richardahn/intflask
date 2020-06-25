import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import app from '../reducers/index';

// In order to debug Redux using the Redux DevTool Chrome Extension, you need to add this:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const middleware = [thunk];
export default function createAppStore() {
  return createStore(
    app,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  ); // optionally specify initial state to hydrate the store with the state from the server
}
