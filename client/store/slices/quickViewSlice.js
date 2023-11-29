import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: {},
};

const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    openQuickView: (state, action) => {
      if (!action.payload) return;

      state.open = true;
      state.data = action.payload;
    },
    closeQuickView: (state) => {
      state.open = false;
      state.data = {};
    },
  },
});

export const { openQuickView, closeQuickView } = quickViewSlice.actions;

export default quickViewSlice.reducer;
