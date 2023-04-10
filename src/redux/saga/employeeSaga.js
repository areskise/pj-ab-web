import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { employeeActions } from '../slice/employeeSlice';
import EmployeeAPI from '../../API/EmployeeAPI';

function* fetchEmployees(action) {
    try {
        const res = yield call(EmployeeAPI.getAll, action.payload);
        const result = res.ResponseResult.Result
        yield put(employeeActions.setEmployees(result));
    } 
    catch(err) {
        console.log(err);
    }
};

export default function* employeeSaga() {
    yield takeLeading(employeeActions.setEmployees.type, fetchEmployees);
};