import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    permissions: [],
    permissionById: null,
    permissionByRole: null,
};

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setPermissions(state, action) {
            state.permissions = action.payload
        },

        setById(state, action) {
            state.permissionById = action.payload
        },

        setByRole(state, action) {
            state.permissionByRole = action.payload
        },
    }
});

export const permissionActions = permissionSlice.actions;

export const selectorPermissions = state => state.permission.permissions

const permissionReducer = permissionSlice.reducer;
export default permissionReducer;