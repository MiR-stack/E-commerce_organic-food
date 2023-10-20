import { initialState } from "./slices/authSlice";

export const cartMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    localStorage.setItem("products", JSON.stringify(getState().products));
    return result;
  };

export const reHydrateStore = () => {
  let data = {};
  if (localStorage.getItem("products") !== null) {
    data.products = JSON.parse(localStorage.getItem("products")); // re-hydrate the store
  }

  const token = localStorage.getItem("token");
  if (token) {
    data.authentication = {
      ...initialState,
      token: JSON.parse(token),
    };
  }
  return data;
};
