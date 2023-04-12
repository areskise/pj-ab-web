import { call, put, takeLeading } from 'redux-saga/effects';
import { permissionActions } from '../slice/permissionSlice';
import PermissionAPI from '../../API/PermissionAPI';

function* fetchPermissions(action) {
    try {
        const res = yield call(PermissionAPI.getAll, action.payload);
        const result = res.ResponseResult.Result
        console.log(res);
        yield put(permissionActions.setPermissions(result));
    } 
    catch(err) {
        console.log(err);
    }
};

export default function* permissionSaga() {
    yield takeLeading(permissionActions.setPermissions.type, fetchPermissions);
};