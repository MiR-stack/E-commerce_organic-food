import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    handleUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { handleUser } = userSlice.actions;

export default userSlice.reducer;
