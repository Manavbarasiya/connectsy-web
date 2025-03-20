import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer
    },
})

export default appStore