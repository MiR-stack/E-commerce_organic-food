import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import { authenticationApi } from "./apis/authentication";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist",
  storage,
};

const rootReducer = combineReducers({
  products: productSlice,
  authentication: authSlice,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authenticationApi.middleware
    ),
});
