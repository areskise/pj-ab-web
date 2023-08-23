import { put, takeLeading } from 'redux-saga/effects';
import { menuActions } from '../slice/menuSlice';;

function* fetchMenu(action) {
    yield put(menuActions.setMenu(action.payload));
};

function* fetchDefault(action) {
    yield put(menuActions.setDefault(action.payload));
};

export default function* menuSaga() {
    yield takeLeading(menuActions.setDefault.type, fetchDefault);
    yield takeLeading(menuActions.setMenu.type, fetchMenu);
};