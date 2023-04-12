import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import companyReducer from './slice/companySlice';
import permissionReducer from './slice/permissionSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        company: companyReducer,
        permission: permissionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;