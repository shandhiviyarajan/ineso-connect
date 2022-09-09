import { call, put, take, delay } from "redux-saga/effects";
import { PROFILE_TYPES } from "../../redux/actions/profileActions";
import {
  apiEditUser,
  apiGetFileStatus,
  apiGetUser,
  apiMoreInfo,
  apiGetPercentage,
  apiUploadProfilePicture,
  apiEditGeneralUser, apiGetProfilePic,
} from '../../API/apiProfile';

//saga watcher for get user & percentage
export function* watchGetUser() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.GET_USER);

    try {
      const response = yield call(apiGetUser, payload);
      yield put({ type: PROFILE_TYPES.GET_USER_SUCCESS, response });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.GET_USER_FAIL, error });
    }
  }
}

//saga watcher for more info
export function* watchMoreInfo() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.MORE_INFO);
    try {
      const response = yield call(apiMoreInfo, payload);
      yield put({ type: PROFILE_TYPES.MORE_INFO_SUCCESS, response });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.MORE_INFO_FAIL, error });
    }
  }
}

//saga watch edit personal user
export function* watchEditPersonalUser() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.EDIT_PROFILE);
    try {
      let response = yield call(apiEditUser, payload);
      yield put({ type: PROFILE_TYPES.EDIT_PROFILE_SUCCESS, response });

      response = yield call(apiGetUser, payload.id);
      yield put({ type: PROFILE_TYPES.GET_USER_SUCCESS, response })

      const percentage = yield call(apiGetPercentage, payload.id);
      yield put({ type: PROFILE_TYPES.GET_PERCENTAGE_SUCCESS, percentage });

    } catch (error) {
      yield put({ type: PROFILE_TYPES.EDIT_PROFILE_FAIL, error });
    }
  }
}

//saga watch edit general profile
export function* watchEditGeneralInfo() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.EDIT_GENERAL_PROFILE);
    try {
      const response = yield call(apiEditGeneralUser, payload);
      yield put({ type: PROFILE_TYPES.EDIT_GENERAL_PROFILE_SUCCESS, response });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.EDIT_GENERAL_PROFILE_FAIL, error });
    }
  }
}

//saga watch get file status
export function* watchGetFileStatus() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.GET_FILE_STATUS);
    try {
      const response = yield call(apiGetFileStatus, payload);
      yield put({ type: PROFILE_TYPES.GET_FILE_STATUS_SUCCESS, response });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.GET_FILE_STATUS_FAIL, error });
    }
  }
}
//saga get profile percentage
export function* watchGetPercentage() {
  while (true) {
    const { id } = yield take(PROFILE_TYPES.GET_PERCENTAGE);
    try {
      const percentage = yield call(apiGetPercentage, id);
      yield put({ type: PROFILE_TYPES.GET_PERCENTAGE_SUCCESS, percentage });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.GET_PERCENTAGE_FAIL, error });
    }
  }
}

//saga wather for upload prfile pic
export function* watchUploadProfilePicture() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.UPLOAD_PROFIE_PICTURE);
    try {
      const response = yield call(apiUploadProfilePicture, payload);

      yield put({
        type: PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_SUCCESS,
        response,
      });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_FAIL, error });
    }
  }
}

//saga watcher get profile picture
export function* watchGetProfilePicture() {
  while (true) {
    const { payload } = yield take(PROFILE_TYPES.GET_PROFILE_PIC);
    try {
      const response = yield call(apiGetProfilePic, payload);

      yield put({
        type: PROFILE_TYPES.GET_PROFILE_PIC_SUCCESS,
        response,
      });
    } catch (error) {
      yield put({ type: PROFILE_TYPES.GET_PROFILE_PIC_FAIL, error });
    }
  }
}

