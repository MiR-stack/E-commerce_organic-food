import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: false,
  component: "login",
  route: "/",
  error: "",
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
      state.error = "";
    },
    handleError: (state, action) => {
      state.error = action.payload;
    },
    handleComponent: (state, action) => {
      state.component = action.payload;
    },
    handleToken: (state, action) => {
      state.token = action.payload;
    },
    handleRoute: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const {
  handleOpen,
  handleClose,
  handleComponent,
  handleError,
  handleRoute,
  handleToken,
  handleIsLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
