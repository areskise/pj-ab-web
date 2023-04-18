import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applications: []
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplications(state, action) {
            state.applications = action.payload
        }
    }
});

export const applicationActions = applicationSlice.actions;

export const selectorApplications = state => state.application.applications

const applicationReducer = applicationSlice.reducer;
export default applicationReducer;