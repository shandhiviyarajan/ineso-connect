import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from "../middleware/sagas";
import rootReducer from "../redux/reducers";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//run saga middleware
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
