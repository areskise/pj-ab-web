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
    getUsers: null,
    getRoles: null,
    create: null,
    update: null,
    modalData: {},
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

        fetchUsers(state, action) {
            state.getUsers = action.payload
        },

        fetchRoles(state, action) {
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

export const companyActions = companySlice.actions;

export const selectorCompanies = state => state.company.companies

const companyReducer = companySlice.reducer;
export default companyReducer;