import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  createConversationApi,
  getConversationsApi,
  removeConversationApi,
} from "../api/conversations";
import { getMessagesApi, createMessageApi } from "../api/messages";
import { counterReducer } from "./counter";
import { conversationsReducer } from "./conversations";
import { messagesReducer } from "./messages";
import { logger, timeScheduler} from "./middlewares";

const api = {
  createConversationApi,
  getConversationsApi,
  removeConversationApi,
  getMessagesApi,
  createMessageApi,
};

const persistConfig = {
  key: "gbchat",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    counter: counterReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,

  })
);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      logger,
      timeScheduler,
      thunk.withExtraArgument(api)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args
  )
);

export const persistor = persistStore(store);
