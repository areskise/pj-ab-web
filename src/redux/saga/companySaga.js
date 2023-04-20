import { put, takeLeading } from 'redux-saga/effects';
import { companyActions } from '../slice/companySlice';

function* fetchCompanies(action) {
    yield put(companyActions.setCompanies(action.payload));
};

function* fetchUserCompaies(action) {
    yield put(companyActions.setUserCompanies(action.payload));
};

export default function* companySaga() {
    yield takeLeading(companyActions.setCompanies.type, fetchCompanies);
    yield takeLeading(companyActions.setUserCompanies.type, fetchUserCompaies);
};