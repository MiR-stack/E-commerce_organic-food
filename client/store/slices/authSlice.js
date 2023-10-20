import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: false,
  component: "login",
  isLoggedIn: false,
  user: null,
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleOpen: (state, action) => {
      state.modal = true;
      state.component = action.payload;
    },
    handleClose: (state) => {
      state.modal = false;
    },
    handleComponent: (state, action) => {
      state.component = action.payload;
    },
    handleUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    handleToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  handleOpen,
  handleClose,
  handleComponent,
  handleUser,
  handleToken,
} = authSlice.actions;

export default authSlice.reducer;
