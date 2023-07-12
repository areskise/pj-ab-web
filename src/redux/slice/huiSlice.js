import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    huis: [],
};

const huiSlice = createSlice({
    name: 'hui',
    initialState,
    reducers: {
        setHuis(state, action) {
            state.huis = action.payload
        },
    }
});

export const huiActions = huiSlice.actions;

export const selectorHuis = state => state.hui.huis

const huiReducer = huiSlice.reducer;
export default huiReducer;