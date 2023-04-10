import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import companyReducer from './slice/companySlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        company: companyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;