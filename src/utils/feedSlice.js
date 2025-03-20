import { createSlice } from "@reduxjs/toolkit";


const feedSLice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeUserFromFeed:(state,action)=>{
            const newArray=state.filter(r=>r._id!=action.payload);
            return newArray;
        }
    }
})

export const {addFeed,removeUserFromFeed}=feedSLice.actions;

export default feedSLice.reducer;
