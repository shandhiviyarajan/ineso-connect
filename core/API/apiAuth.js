import { httpClient, setToken, httpInstance } from "../interceptors/interceptors";
import { Message } from "../../components/molecules/Toast";
import { setClientToken } from "../interceptors/interceptors";
import { Alert } from "react-native";

export const ApiAuth = {
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`, //not available
  REFRESH: `/auth/refresh`,
  ME: `/auth/me`,
};

//Api call  login
export const apiLogin = async (payload: any) => {
  return await httpClient()
    .post(ApiAuth.LOGIN, payload)
    .then((response) => {
      if (response.status === 200) {
        setClientToken(response && response.data && response.data.data.access_token);
        setToken(response && response.data && response.data.data.access_token);
        Message("success", "Login Successful !", "Welcome to Connect");
        return response;
      }

    })
    .catch((error) => {
      Message("error", "Login failed !", error.response.data.error);
      return error;
    });
};

export const apiLogout = async () => {
  return await httpClient()
    .get(ApiAuth.LOGOUT)
    .then((response) => {
      Message("success", "Logged out", "");
      return response;
    })
    .catch((error) => {
      Message("error", "Logout failed !", error.response.data.message);
      return error;
    });
};

export const me = async () => {
  const httpRequest = await httpInstance();
  return await httpRequest
    .get(ApiAuth.ME)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const refresh = async () => {
  const httpRequest = await httpInstance();
  return await httpRequest
    .get(ApiAuth.REFRESH)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
