import { IUser } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser | null = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.removeItem("urls");
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
