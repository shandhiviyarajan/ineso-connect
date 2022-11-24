import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import clientReducer from "./clientsReducer";
import siteReducer from "./siteReducer";
import deviceReducer from "./deviceReducer";
import groupReducer from "./groupReducer";
import alertReducer from "./alertReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from "redux-persist";
import metaReducer from "./metaReducer";
import qrReducer from "./qrReducer";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["isAuthenticated", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: profileReducer,
  client: clientReducer,
  site: siteReducer,
  group: groupReducer,
  device: deviceReducer,
  alert: alertReducer,
  meta: metaReducer,
  qr: qrReducer,
});
export default rootReducer;
