

export const AUTH_TYPES = {
  // ApiAuth types
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  ME_START: "ME_START",
  ME_SUCCESS: "ME_SUCCESS",
  ME_FAIL: "ME_FAIL",

  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",

  SIGNUP_START: "SIGNUP_START",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAIL: "SIGNUP_FAIL",

  VERIFY_EMAIL_START: "VERIFY_EMAIL_START",
  VERIFY_EMAIL_SUCCESS: "VERIFY_EMAIL_SUCCESS",
  VERIFY_EMAIL_FAIL: "VERIFY_EMAIL_FAIL",

  FORGOT_PASSWORD_START: "FORGOT_PASSWORD_START",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL",

  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAIL: "RESET_PASSWORD_FAIL",



};
//login actions
export const LoginAction = (payload) => {
  return {
    type: AUTH_TYPES.LOGIN_START,
    payload: payload,
  };
};

export const LoginSuccessAction = (payload) => {
  return {
    type: AUTH_TYPES.LOGIN_SUCCESS,
    payload,
  };
};


export const LoginFailedAction = (payload) => {
  return {
    type: AUTH_TYPES.LOGIN_FAIL,
    payload,
  };
};
//auth me
export const MeAction = () => {
  return {
    type: AUTH_TYPES.ME_START,
  };
};

export const MeSuccessAction = (payload) => {
  return {
    type: AUTH_TYPES.ME_SUCCESS,
    payload,
  };
};

export const MeFailAction = (payload) => {
  return {
    type: AUTH_TYPES.ME_FAIL,
    payload,
  };
};




//logout action
export const LogoutAction = () => {
  return {
    type: AUTH_TYPES.LOGOUT_START,
    payload: false
  }
}

export const LogoutSuccessAction = (payload) => {
  return {
    type: AUTH_TYPES.LOGOUT_SUCCESS,
    payload
  }
}

export const LogoutFailAction = (payload) => {
  return {
    type: AUTH_TYPES.LOGOUT_FAIL,
    payload
  }
}

//sign up actions
export const SignUpPayloadAction = (payload) => {
  return {
    type: 'SIGN_UP_PAYLOAD',
    payload
  }
}

//forgot password actions
export const ForgotPasswordAction = (payload) => {
  return {
    type: AUTH_TYPES.FORGOT_PASSWORD_START,
    payload
  }
}

export const ForgotPasswordSuccessAction = (payload) => {
  return {
    type: AUTH_TYPES.FORGOT_PASSWORD_SUCCESS,
    payload
  }
}

export const ForgotPasswordFailedAction = (payload) => {
  return {
    type: AUTH_TYPES.FORGOT_PASSWORD_FAIL,
    payload
  }
}

//reset password actions

//verify email actions
