import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducers from "./connectionSlice";
import requestReducers from "./requestSlice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducers,
        requests:requestReducers
    },
})

export default appStore