import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    pagination: {
        page: 1,
        limit: 5,
        count: 0,
        totalPage: 1,
    },
    getById: null,
    getUsers: null,
    getRoles: null,
    create: null,
    update: null,
    modalData: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees(state, action) {
            state.employees = action.payload
        },

        fetchById(state, action) {
            state.getById = action.payload
        },

        changePass(state, action) {
            state.getUsers = action.payload
        },

        setPass(state, action) {
            state.getRoles = action.payload
        },

        create(state, action) {
            state.create = action.payload
        },

        update(state, action) {
            state.update = action.payload
        },

        modalData(state, action) {
            state.modalData = action.payload
        },
    }
});

export const employeeActions = employeeSlice.actions;

export const selectorEmployees = state => state.employee.employees

const employeeReducer = employeeSlice.reducer;
export default employeeReducer;