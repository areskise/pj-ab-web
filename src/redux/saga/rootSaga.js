import { all } from 'redux-saga/effects';
import companySaga from './companySaga';
import employeeSaga from './employeeSaga';

export default function* rootSaga() {
    yield all([
        companySaga(),
        employeeSaga()
    ])
}