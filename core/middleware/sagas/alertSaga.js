import { call, put, take } from "redux-saga/effects";
import { apiFetchAlerts } from '../../API/apiAlert';
import { ALERT_TYPES } from "../../redux/actions/alertActions";

//saga watcher for get clients
export function* watchFetchAlerts() {
    while (true) {
        const { payload } = yield take(ALERT_TYPES.GET_ALERTS);
        console.log(payload);
        try {
            const response = yield call(apiFetchAlerts, payload);
            yield put({ type: ALERT_TYPES.GET_ALERTS_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: ALERT_TYPES.GET_ALERTS_FAIL, payload: error });
        }
    }
}
