import { all } from "redux-saga/effects";
import * as authSaga from "./authSaga";
import * as clientSaga from "./clientSaga";
import * as sitesSaga from "./sitesSaga";
import * as groupSaga from "./groupSaga";
import * as deviceSaga from "./deviceSaga";
import * as alertSaga from "./alertSaga";

import * as qrSaga from "./qrSaga";
function* rootSaga() {
  yield all([
    //qr search and active 
    qrSaga.watchActivateDevice(),
    qrSaga.watchQRSearchDevice(),

    authSaga.watchAuthUser(),
    //profile me
    authSaga.watchMe(),
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
    deviceSaga.watchSYNCDevice(),
    //alerts
    alertSaga.watchFetchAlerts(),
  ]);
}

export default rootSaga;
