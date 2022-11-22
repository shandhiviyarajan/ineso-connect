import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TYPES } from "../actions/authActions";

const initialState = {
  user_id: null,
  user: false,
  isLoading: false,
  error: false,
  isAuthenticated: false,

  me: {
    data: null,
    isLoading: false,
    errors: false,
  },
};

const authReducer = (
  state = initialState,
  action: {
    type: any;
    response: {
      data: { user_id: any; access_token: any };
      user: { id: any };
      idToken: any;
    };
    error: any;
    payload: any;
    appConfig: null;
  }
) => {
  switch (action.type) {
    case AUTH_TYPES.SET_CONFIG:
      return {
        ...state,
        appConfig: action.payload,
      };
    case AUTH_TYPES.LOGIN_START:
      return {
        ...state,
        user: false,
        isLoading: true,
        error: false,
        isAuthenticated: false,
      };

    case AUTH_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: true,
        isAuthenticated:
          action.payload &&
          action.payload.data &&
          action.payload.data.data.access_token,
      };

    case AUTH_TYPES.LOGIN_FAIL:
      return {
        ...state,
        user: false,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case AUTH_TYPES.ME_START:
      return {
        ...state,
        me: {
          data: null,
          isLoading: true,
          errors: false,
        },
      };

    case AUTH_TYPES.ME_SUCCESS:
      return {
        ...state,
        me: {
          data: action.payload,
          isLoading: false,
          errors: false,
        },
      };

    case AUTH_TYPES.ME_FAIL:
      return {
        ...state,
        me: {
          data: null,
          isLoading: false,
          errors: action.payload,
        },
      };

    case AUTH_TYPES.LOGOUT_START:
      return {
        ...state,
        user: false,
        user_id: false,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      };

    case AUTH_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        user: false,
        user_id: false,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      };

    case AUTH_TYPES.LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: false,
        user_id: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
