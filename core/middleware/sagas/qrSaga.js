import { call, put, take } from "redux-saga/effects";
import { Message } from "../../../components/molecules/Toast";
import { apiSearchDevices, apiActiveDevice } from '../../API/apiQR';
import { DEVICE_TYPES } from "../../redux/actions/deviceActions";
import { QR_TYPES } from "../../redux/actions/qrActions";

//saga watcher for activate devices
export function* watchActivateDevice() {
    while (true) {
        const { payload } = yield take(QR_TYPES.ACTIVATE_DEVICE);


        try {
            const response = yield call(apiActiveDevice, payload);

            console.log(response);
            if (response && response.status === 200) {
                Message("success", "Device successfully activeted", "");
                yield put({ type: QR_TYPES.ACTIVATE_DEVICE_SUCCESS, payload: deviceId });
            }
        } catch (error) {
            Message("error", "Device activation failed", "Device might already activated");
            yield put({ type: QR_TYPES.ACTIVATE_DEVICE_FAIL, payload: error.response.data });
        }

    }
};


export function* watchQRSearchDevice() {
    while (true) {
        const { payload } = yield take(QR_TYPES.SEARCH_DEVICE);
        try {
            const response = yield call(apiSearchDevices, payload);

            console.log(response.data.data);
            if (response && response.status === 200) {

                yield put({
                    type: QR_TYPES.SEARCH_DEVICE_SUCCESS, payload: response.data.data
                        && response.data.data.length > 0
                        && response.data.data.filter(d => d !== null).length > 0 ? response.data.data : null
                });

                yield put({
                    type: DEVICE_TYPES.GET_DEVICE_SUCCESS, payload: response.data.data
                        && response.data.data.length > 0
                        && response.data.data.filter(d => d !== null).length > 0 ? response.data.data : null
                });
            } else {
                yield put({ type: QR_TYPES.SEARCH_DEVICE_FAIL, payload: null });
            }

        } catch (error) {
            yield put({ type: QR_TYPES.SEARCH_DEVICE_FAIL, payload: error });
        }
    }
};
