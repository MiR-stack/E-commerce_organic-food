import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  carts: [],
};

export const productSlice = createSlice({
  name: "userSelected",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exist = state.favorites.find(
        (product) => product.id === action.payload.id
      );

      if (!exist) {
        state.favorites.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
    addCart: (state, action) => {
      const product = state.carts.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.count++;
      } else {
        state.carts.push(action.payload);
      }
    },
    increaseItem: (state, action) => {
      let product = state.carts.find(
        (product) => product.id === action.payload
      );

      product.count++;
    },
    dicreaseItem: (state, action) => {
      let product = state.carts.find(
        (product) => product.id === action.payload
      );

      if (product.count > 1) {
        product.count--;
      }
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  addFavorite,
  updateFavorite,
  removeFavorite,
  addCart,
  increaseItem,
  dicreaseItem,
  removeCart,
} = productSlice.actions;

export default productSlice.reducer;
