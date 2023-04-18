import { call, put, takeLeading } from 'redux-saga/effects';
import { employeeActions } from '../slice/employeeSlice';
import EmployeeAPI from '../../API/EmployeeAPI';
import CompanyAPI from '../../API/CompanyAPI';

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

function* fetchUsers(action) {
    console.log(action.payload);
    try {
        const res = yield call(CompanyAPI.getUsers, action.payload);
        const result = res.ResponseResult.Result
        yield put(employeeActions.setUsers(result));
    } 
    catch(err) {
        console.log(err);
    }
};

export default function* employeeSaga() {
    yield takeLeading(employeeActions.setEmployees.type, fetchEmployees);
    yield takeLeading(employeeActions.setUsers.type, fetchUsers);
};