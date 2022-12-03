import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import sessionReducer from "./session";
import thunk from "redux-thunk";
import userOwnedHomesReducer from "./userOwnedHomes";
import userPartHomesReducer from "./userPartHomes";
import currentMenuContentReducer from "./currentMenuContent";
import currentMainContentReducer from "./currentMainContent";
import roomsReducer from "./room";
import messageReducer1 from "./messageState1";
import anagramReducer from "./anagram";

const rootReducer = combineReducers({
  session: sessionReducer,
  userOwnedHomes: userOwnedHomesReducer,
  userPartHomes: userPartHomesReducer,
  currentMenuContent: currentMenuContentReducer,
  currentMainContent: currentMainContentReducer,
  rooms: roomsReducer,
  messages1: messageReducer1,
  anagram: anagramReducer,
});
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
