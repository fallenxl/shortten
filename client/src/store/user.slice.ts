import { IUser } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isErrored: false,
  data: null as IUser | null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;

    },
    isLoading: (state) => {
      state.isLoading = true;
      state.isErrored = false;
    },
    isErrored: (state) => {
      state.isLoading = false;
      state.isErrored = true;
    },
    isSuccessful: (state) => {
      state.isLoading = false;
      state.isErrored = false;
    }
  },
});

export const { setUser, isLoading, isErrored, isSuccessful } = userSlice.actions;
export default userSlice.reducer;
