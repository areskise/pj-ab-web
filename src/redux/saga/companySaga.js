import { call, put, takeLeading } from 'redux-saga/effects';
import { companyActions } from '../slice/companySlice';
import CompanyAPI from '../../API/CompanyAPI';

function* fetchCompanies(action) {
    try {
        const res = yield call(CompanyAPI.getAll, action.payload);
        const result = res.ResponseResult.Result
        yield put(companyActions.setCompanies(result));
    } 
    catch(err) {
        console.log(err);
    }
};

export default function* companySaga() {
    yield takeLeading(companyActions.setCompanies.type, fetchCompanies);
};