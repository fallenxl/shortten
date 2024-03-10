import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import urlReducer from "./url.slice";

export  const store = configureStore({
    reducer: {
        user: userReducer,
        url: urlReducer,
    },
});