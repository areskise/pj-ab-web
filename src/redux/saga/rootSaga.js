import { all } from 'redux-saga/effects';
import companySaga from './companySaga';
import employeeSaga from './employeeSaga';
import permissionSaga from './permissionSaga';
import applicationSaga from './applicationSaga';

export default function* rootSaga() {
    yield all([
        companySaga(),
        employeeSaga(),
        permissionSaga(),
        applicationSaga(),
    ])
}