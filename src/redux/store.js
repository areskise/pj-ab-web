import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import companyReducer from './slice/companySlice';
import permissionReducer from './slice/permissionSlice';
import createSagaMiddleware from 'redux-saga';
import applicationReducer from './slice/applicationSlice';
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        company: companyReducer,
        permission: permissionReducer,
        application: applicationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;