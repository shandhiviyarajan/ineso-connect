import { Alert } from "react-native";
import { call, put, take } from "redux-saga/effects";
import { apiFetchSites } from "../../API/apiSites";
import { SITES_TYPES } from "../../redux/actions/siteActions";

//saga watcher for get clients
export function* watchFechSites() {
    while (true) {
        const { payload } = yield take(SITES_TYPES.GET_SITES);
        try {
            const response = yield call(apiFetchSites, payload);
            yield put({ type: SITES_TYPES.GET_SITES_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: SITES_TYPES.GET_SITES_FAIL, payload: error });
        }
    }
}
