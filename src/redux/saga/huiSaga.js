import { put, takeLeading } from 'redux-saga/effects';
import { huiActions } from '../slice/huiSlice';

function* fetchHuis(action) {
    yield put(huiActions.setHuis(action.payload));
};

export default function* HuiSaga() {
    yield takeLeading(huiActions.setHuis.type, fetchHuis);
};