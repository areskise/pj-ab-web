import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],
    pagination: {
        page: 1,
        limit: 5,
        count: 0,
        totalPage: 1,
    }
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies(state, action) {
            state.companies = action.payload
        },
    }
});

export const companyActions = companySlice.actions;

export const selectorCompanies = state => state.company.companies

const companyReducer = companySlice.reducer;
export default companyReducer;