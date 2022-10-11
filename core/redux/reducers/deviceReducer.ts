import { DEVICE_TYPES } from "../actions/deviceActions";
import { QR_TYPES } from "../actions/qrActions";

const initialState = {
  devices: {
    isLoasding: false,
    data: null,
    erros: false,
  },
  device: {
    isLoasding: false,
    data: null,
    erros: false,
  },
  filtered: [],
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case QR_TYPES.SEARCH_DEVICE:
      return {
        ...state,
        devices: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case QR_TYPES.SEARCH_DEVICE_SUCCESS:
      return {
        ...state,
        devices: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case QR_TYPES.SEARCH_DEVICE_FAIL:
      return {
        ...state,

        devices: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };

    case DEVICE_TYPES.GET_SEARCH:
      return {
        ...state,
        filtered: action.payload,
      };

    case DEVICE_TYPES.GET_DEVICES:
      return {
        ...state,
        devices: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case DEVICE_TYPES.GET_DEVICES_SUCCESS:
      return {
        ...state,

        devices: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case DEVICE_TYPES.GET_DEVICES_FAIL:
      return {
        ...state,
        devices: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };

    case DEVICE_TYPES.GET_DEVICE:
      return {
        ...state,
        device: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case DEVICE_TYPES.GET_DEVICE_SUCCESS:
      return {
        ...state,

        device: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case DEVICE_TYPES.GET_DEVICE_FAIL:
      return {
        ...state,
        device: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };

    default:
      return state;
  }
};

export default deviceReducer;
