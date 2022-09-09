import { call, put, take, delay } from "redux-saga/effects";
import { AUTH_TYPES } from "../../redux/actions/authActions";
import { apiLogin, apiLogout, me } from '../../API/apiAuth';

//saga watcher for login
export function* watchAuthUser() {
  while (true) {
    const { payload } = yield take(AUTH_TYPES.LOGIN_START);
    try {
      const response = yield call(apiLogin, payload);
      yield put({ type: AUTH_TYPES.LOGIN_SUCCESS, payload: response });
    } catch (error) {
      yield put({ type: AUTH_TYPES.LOGIN_FAIL, payload: error });
    }
  }
}






//saga watcher for logout
export function* watchMe() {
  while (true) {
    yield take(AUTH_TYPES.ME_START);
    try {
      const response = yield call(me, {});
      yield put({ type: AUTH_TYPES.ME_SUCCESS, payload: response.data.data });
    } catch (error) {
      yield put({ type: AUTH_TYPES.ME_FAIL, payload: error });
    }
  }
}