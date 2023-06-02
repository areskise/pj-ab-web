import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    default: []
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setDefault(state, action) {
            state.default = action.payload
        }
    }
});

export const menuActions = menuSlice.actions;

export const selectorMenuDefault = state => state.menu.default

const menuReducer = menuSlice.reducer;
export default menuReducer;