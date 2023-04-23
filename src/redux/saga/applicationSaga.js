import { call, put, takeLeading } from 'redux-saga/effects';
import { applicationActions } from '../slice/applicationSlice';
import ApplicationAPI from '../../API/ApplicationAPI';

function* fetchApplications(action) {
    try {
        const res = yield call(ApplicationAPI.getAll, action.payload);
        const result = res.ResponseResult.Result
        yield put(applicationActions.setApplications(result));
    } 
    catch(err) {
        console.log(err);
    }
};

export default function* applicationSaga() {
    yield takeLeading(applicationActions.setApplications.type, fetchApplications);
};