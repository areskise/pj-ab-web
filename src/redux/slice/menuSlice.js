import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    default: [],
    menu: []
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setDefault(state, action) {
            state.default = action.payload
        },
        setMenu(state, action) {
            state.menu = action.payload
        }
    }
});

export const menuActions = menuSlice.actions;

export const selectorMenuDefault = state => state.menu.default
export const selectorMenu = state => state.menu.menu

const menuReducer = menuSlice.reducer;
export default menuReducer;