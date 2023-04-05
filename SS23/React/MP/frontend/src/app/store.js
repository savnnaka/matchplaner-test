import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userReducer";
import teamReducer from "../features/team/teamReducer";
import clubReducer from "../features/club/clubReducer";
import trainingsplanerReducer from "../features/trainingsplaner/trainingsplanerReducer";
import matchplanerReducer from "../features/matchplaner/matchplanerReducer";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  team: teamReducer,
  club: clubReducer,
  trainingsplaner: trainingsplanerReducer,
  matchplaner: matchplanerReducer,
  team: teamReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
