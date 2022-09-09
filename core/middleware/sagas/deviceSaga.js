import { call, put, take } from "redux-saga/effects";
import { DEVICE_TYPES } from "../../redux/actions/deviceActions";
import { apiFetchDevices, apiFetchDevice } from '../../API/apiDevices';

//saga watcher for get clients
export function* watchFechDevices() {
    while (true) {
        const { payload } = yield take(DEVICE_TYPES.GET_DEVICES);
        console.log(payload);
        try {
            const response = yield call(apiFetchDevices, payload);
            yield put({ type: DEVICE_TYPES.GET_DEVICES_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: DEVICE_TYPES.GET_DEVICES_FAIL, payload: error });
        }
    }
}

export function* watchFechDevice() {
    while (true) {
        const { payload } = yield take(DEVICE_TYPES.GET_DEVICE);
        try {
            const response = yield call(apiFetchDevice, payload);
            yield put({ type: DEVICE_TYPES.GET_DEVICE_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: DEVICE_TYPES.GET_DEVICE_FAIL, payload: error });
        }
    }
}


//apiFetchDevice