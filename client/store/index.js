import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import { cartMiddleware, reHydrateStore } from "./middlewares";
import authSlice from "./slices/authSlice";
import { authenticationApi } from "./apis/authentication";

export const store = configureStore({
  reducer: {
    products: productSlice,
    authentication: authSlice,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware, authenticationApi.middleware),
});
