import { QR_TYPES } from "../actions/qrActions";

const initialState = {
  QR_CODE: null,
  activate: {
    isLoading: false,
    data: null,
    errors: null,
  },
  payload: false,
};

const qrReducer = (state = initialState, action) => {
  switch (action.type) {
    case QR_TYPES.SET_PAYLOAD:
      return {
        ...state,
        payload: action.payload,
      };

    case QR_TYPES.SET_QR:
      return {
        ...state,
        QR_CODE: action.payload,
      };

    case QR_TYPES.ACTIVATE_DEVICE:
      return {
        ...state,
        activate: {
          isLoading: true,
          data: false,
          errors: false,
        },
      };
    case QR_TYPES.ACTIVATE_DEVICE_SUCCESS:
      return {
        ...state,
        activate: {
          isLoading: false,
          data: action.payload,
          errors: null,
        },
      };
    case QR_TYPES.ACTIVATE_DEVICE_FAIL:
      return {
        ...state,
        activate: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };

    default:
      return state;
  }
};

export default qrReducer;
