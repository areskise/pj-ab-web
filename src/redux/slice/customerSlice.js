import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
    count: 0,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers(state, action) {
            state.customers = action.payload
        },
    }
});

export const customerActions = customerSlice.actions;

export const selectorCustomers = state => state.customer.customers

const customerReducer = customerSlice.reducer;
export default customerReducer;