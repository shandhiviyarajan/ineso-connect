import { ALERT_TYPES } from "../actions/alertActions";

const initialState = {
  alerts: {
    isLoasding: false,
    data: null,
    erros: false,
  },
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_TYPES.GET_ALERTS:
      return {
        ...state,
        alerts: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case ALERT_TYPES.GET_ALERTS_SUCCESS:
      return {
        ...state,

        alerts: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case ALERT_TYPES.GET_ALERTS_FAIL:
      return {
        ...state,
        alerts: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};

export default alertReducer;
