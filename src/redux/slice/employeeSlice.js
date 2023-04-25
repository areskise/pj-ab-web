import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    allEmployees: [],
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees(state, action) {
            state.employees = action.payload
        },

        setAllEmployees(state, action) {
            state.allEmployees = action.payload
        },

        setUsers(state, action) {
            state.employees = action.payload
        },
    }
});

export const employeeActions = employeeSlice.actions;

export const selectorEmployees = state => state.employee.employees
export const selectorAllEmployees = state => state.employee.allEmployees

const employeeReducer = employeeSlice.reducer;
export default employeeReducer;