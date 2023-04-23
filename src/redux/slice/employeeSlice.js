import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees(state, action) {
            state.employees = action.payload
        },

        setUsers(state, action) {
            state.employees = action.payload
        },
    }
});

export const employeeActions = employeeSlice.actions;

export const selectorEmployees = state => state.employee.employees

const employeeReducer = employeeSlice.reducer;
export default employeeReducer;