import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import { authenticationApi } from "./apis/authentication";
import { productsApi } from "./apis/products";
import { commentApi } from "./apis/comment";
import { reviewApi } from "./apis/review";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const rootReducer = combineReducers({
  products: productSlice,
  authentication: authSlice,
  user: userSlice,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authenticationApi.middleware,
      productsApi.middleware,
      commentApi.middleware,
      reviewApi.middleware
    ),
});
