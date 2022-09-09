import { Alert } from "react-native";
import { call, put, take } from "redux-saga/effects";
import { apiFetchGroups } from "../../API/apiSites";
import { GROUP_TYPES } from "../../redux/actions/groupActions";


//saga watcher for get clients
export function* watchFechGroups() {
    while (true) {
        const { payload } = yield take(GROUP_TYPES.GET_GROUP);
        try {
            const response = yield call(apiFetchGroups, payload);
            yield put({ type: GROUP_TYPES.GET_GROUP_SUCCESS, payload: response.data.data });
        } catch (error) {
            yield put({ type: GROUP_TYPES.GET_GROUP_FAIL, payload: error });
        }
    }
}
