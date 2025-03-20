import { createSlice } from "@reduxjs/toolkit";


const feedSLice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state,actions)=>{
            return null;
        }
    }
})

export const {addFeed,removeFeed}=feedSLice.actions;

export default feedSLice.reducer;
