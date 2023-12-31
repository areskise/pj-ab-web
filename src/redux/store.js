import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import customerReducer from './slice/customerSlice';
import huiReducer from './slice/huiSlice';
import companyReducer from './slice/companySlice';
import permissionReducer from './slice/permissionSlice';
import createSagaMiddleware from 'redux-saga';
import applicationReducer from './slice/applicationSlice';
import rootSaga from "./saga/rootSaga";
import menuReducer from './slice/menuSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        hui: huiReducer,
        customer: customerReducer,
        employee: employeeReducer,
        company: companyReducer,
        permission: permissionReducer,
        application: applicationReducer,
        menu: menuReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;