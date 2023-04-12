import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],
    pagination: {
        page: 1,
        limit: 5,
        count: 0,
        totalPage: 1,
    },
    getById: null,
    users: [],
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies(state, action) {
            state.companies = action.payload
        },

        fetchById(state, action) {
            state.getById = action.payload
        },

        setUsers(state, action) {
            state.users = action.payload
        },
    }
});

export const companyActions = companySlice.actions;

export const selectorCompanies = state => state.company.companies
export const selectorUsers = state => state.company.users

const companyReducer = companySlice.reducer;
export default companyReducer;