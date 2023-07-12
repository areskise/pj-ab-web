import { put, takeLeading } from 'redux-saga/effects';
import { customerActions } from '../slice/customerSlice';

function* fetchCustomers(action) {
    yield put(customerActions.setCustomers(action.payload));
};

export default function* customerSaga() {
    yield takeLeading(customerActions.setCustomers.type, fetchCustomers);
};