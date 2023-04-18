import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    permissions: []
};

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setPermissions(state, action) {
            state.permissions = action.payload
        }
    }
});

export const permissionActions = permissionSlice.actions;

export const selectorPermissions = state => state.permission.permissions

const permissionReducer = permissionSlice.reducer;
export default permissionReducer;