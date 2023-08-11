import { put, takeLeading } from 'redux-saga/effects';
import { companyActions } from '../slice/companySlice';

function* fetchCompanies(action) {
    yield put(companyActions.setCompanies(action.payload));
};

function* fetchUserCompanies(action) {
    yield put(companyActions.setUserCompanies(action.payload));
};

function* fetchSelectedCompany(action) {
    yield put(companyActions.setSelectedCompany(action.payload));
};

export default function* companySaga() {
    yield takeLeading(companyActions.setCompanies.type, fetchCompanies);
    yield takeLeading(companyActions.setUserCompanies.type, fetchUserCompanies);
    yield takeLeading(companyActions.setSelectedCompany.type, fetchSelectedCompany);
};