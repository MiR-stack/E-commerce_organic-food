import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import { authenticationApi } from "./apis/authentication";
import { productsApi } from "./apis/products";
import { commentApi } from "./apis/comment";
import { reviewApi } from "./apis/review";
import { globalApi } from "./apis/global";
import userSlice from "./slices/userSlice";
import quickViewSlice from "./slices/quickViewSlice";
import { blogsApi } from "./apis/blogs";

const rootReducer = combineReducers({
  products: productSlice,
  authentication: authSlice,
  user: userSlice,
  quickView: quickViewSlice,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [globalApi.reducerPath]: globalApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authenticationApi.middleware,
      productsApi.middleware,
      commentApi.middleware,
      reviewApi.middleware,
      globalApi.middleware,
      blogsApi.middleware
    ),
});
