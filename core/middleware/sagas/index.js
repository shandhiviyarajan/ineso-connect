import { all } from "redux-saga/effects";
import * as authSaga from "./authSaga";
import * as profileSaga from "./profileSaga";
import * as clientSaga from "./clientSaga";
import * as sitesSaga from "./sitesSaga";
import * as groupSaga from "./groupSaga";
import * as deviceSaga from "./deviceSaga";
import * as alertSaga from "./alertSaga";
function* rootSaga() {
  yield all([
    authSaga.watchAuthUser(),
    //profile me
    authSaga.watchMe(),
    //profile
    profileSaga.watchGetUser(),
    //client
    clientSaga.watchFechClients(),
    clientSaga.watchFechClient(),
    //sites
    sitesSaga.watchFechSites(),
    //groups
    groupSaga.watchFechGroups(),
    //devivce saga
    deviceSaga.watchFechDevices(),
    deviceSaga.watchFechDevice(),
    //alerts
    alertSaga.watchFetchAlerts(),
  ]);
}

export default rootSaga;
