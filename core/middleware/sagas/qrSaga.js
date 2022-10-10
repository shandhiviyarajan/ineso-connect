import { call, put, take } from "redux-saga/effects";
import { apiFetchAlerts } from '../../API/apiAlert';
import { QR_TYPES } from "../../redux/actions/qrActions";

//saga watcher for activate devices
export function* watchActivateDevice() {
    while (true) {
        const { payload } = yield take(QR_TYPES.ACTIVATE_DEVICE);
        try {
            const response = yield call(apiFetchAlerts, payload);
            yield put({ type: QR_TYPES.ACTIVATE_DEVICE_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: QR_TYPES.ACTIVATE_DEVICE_FAIL, payload: error });
        }
    }
}
