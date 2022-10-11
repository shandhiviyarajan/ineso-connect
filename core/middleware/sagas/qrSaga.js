import { call, put, take } from "redux-saga/effects";
import { apiSearchDevice, apiActiveDevice } from '../../API/apiQR';
import { QR_TYPES } from "../../redux/actions/qrActions";

//saga watcher for activate devices
export function* watchActivateDevice() {
    while (true) {
        const { payload } = yield take(QR_TYPES.ACTIVATE_DEVICE);
        try {
            const response = yield call(apiActiveDevice, payload);
            yield put({ type: QR_TYPES.ACTIVATE_DEVICE_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: QR_TYPES.ACTIVATE_DEVICE_FAIL, payload: error });
        }
    }
};


export function* watchQRSearchDevice() {
    while (true) {
        const { payload } = yield take(QR_TYPES.SEARCH_DEVICE);
        try {
            const response = yield call(apiSearchDevice, payload);
            yield put({ type: QR_TYPES.SEARCH_DEVICE_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: QR_TYPES.SEARCH_DEVICE_FAIL, payload: error });
        }
    }
};
