import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],
    userCompanies: [],
    selectedCompany: null,
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
        setSelectedCompany(state, action) {
            state.selectedCompany = action.payload
        },
    }
});

export const companyActions = companySlice.actions;

export const selectorCompanies = state => state.company.companies
export const selectorUserCompanies = state => state.company.userCompanies
export const selectorSelectedCompany = state => state.company.selectedCompany

const companyReducer = companySlice.reducer;
export default companyReducer;