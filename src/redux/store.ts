import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
import rooReducer from "./reducers/index";

const persistConfig = {
  key: "sims-ppob-muh.ahsan",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rooReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  //.concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);
export default store;
