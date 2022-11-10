import { call, put, take, delay } from "redux-saga/effects";
import { AUTH_TYPES } from "../../redux/actions/authActions";
import { apiLogin, apiLogout, me } from '../../API/apiAuth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SystemColors } from "../../Styles/theme/colors";
import { removeToken } from "../../interceptors/interceptors";

//saga watcher for login
export function* watchAuthUser() {

  removeToken();
  while (true) {
    const { payload } = yield take(AUTH_TYPES.LOGIN_START);
    try {
      const response = yield call(apiLogin, payload);

      if (response.status === 200 && response.data.data.access_token) {
        const responseProfile = yield call(me, {});

        yield put({ type: AUTH_TYPES.ME_SUCCESS, payload: responseProfile.data.data });

        SystemColors.primary = responseProfile.data.data.distributor.color;
        let config = {
          color: SystemColors.primary,
          logo: responseProfile.data.data.distributor.logo,
          background: responseProfile.data.data.distributor.background,
          name: responseProfile.data.data.distributor.name,
          isSVG: responseProfile.data.data.distributor.logo.includes(".svg"),
          isPNG: responseProfile.data.data.distributor.logo.includes(".png")
        };
        //set app config data
        AsyncStorage.setItem("@app-config", JSON.stringify(config));

        yield put({
          type: AUTH_TYPES.SET_CONFIG, payload: config,
        })

        yield put({ type: AUTH_TYPES.LOGIN_SUCCESS, payload: response });

      } else {
        yield put({ type: AUTH_TYPES.LOGIN_FAIL, payload: response });
      }

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