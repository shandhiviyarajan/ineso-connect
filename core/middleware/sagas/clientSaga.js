import { call, put, take } from "redux-saga/effects";
import { CLIENT_TYPES } from "../../redux/actions/clientsActions";
import { apiFetchClients, apiFetchClient } from '../../API/apiClient';

//saga watcher for get clients
export function* watchFechClients() {
    while (true) {
        yield take(CLIENT_TYPES.GET_CLIENTS);
        try {
            const response = yield call(apiFetchClients, {});
            yield put({ type: CLIENT_TYPES.GET_CLIENTS_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: CLIENT_TYPES.GET_CLIENTS_FAIL, payload: error });
        }
    }
}


//saga watcher for get clients
export function* watchFechClient() {
    while (true) {
        const { payload } = yield take(CLIENT_TYPES.GET_CLIENT);
        try {

            const response = yield call(apiFetchClient, payload);
            yield put({ type: CLIENT_TYPES.GET_CLIENT_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: CLIENT_TYPES.GET_CLIENT_FAIL, payload: error });
        }
    }
}