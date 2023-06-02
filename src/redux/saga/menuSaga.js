import { put, takeLeading } from 'redux-saga/effects';
import { menuActions } from '../slice/menuSlice';;

function* fetchDefault(action) {
    yield put(menuActions.setDefault(action.payload));
};

export default function* menuSaga() {
    yield takeLeading(menuActions.setDefault.type, fetchDefault);
};