import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],
    userCompanies: [],
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies(state, action) {
            state.companies = action.payload
        },
        setUserCompanies(state, action) {
            state.userCompanies = action.payload
        },
    }
});

export const companyActions = companySlice.actions;

export const selectorCompanies = state => state.company.companies
export const selectorUserCompanies = state => state.company.userCompanies

const companyReducer = companySlice.reducer;
export default companyReducer;