import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Message } from "../../components/molecules/Toast";
import jwt_decode from "jwt-decode";
//set default api url
//let BASE_URL = "https://connect-staging.inesocompany.com/api";
let BASE_URL = "https://connect.inesocompany.com/api";
let TIME_OUT = 50000;
let ACCESS_TOKEN: any = false;
let axiosRequest = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

let authRequest = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

authRequest.interceptors.request.use(
  (config) => {
    config.headers.baseURL = BASE_URL;
    config.headers.timeout = TIME_OUT;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//configure  response interceptors
authRequest.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setToken = async (value: any) => {
  if (value) {
    await AsyncStorage.setItem("@access_token", value);
  } else {
    await AsyncStorage.removeItem("@access_token");
  }
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("@access_token");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("@access_token");
};

export const isTokenExpired = async () => {
  let TOKEN = await getToken();
  let { exp } = jwt_decode(TOKEN);
  if (Date.now() >= exp * 1000) {
    return true; //expired
  } else {
    return false; //not expired
  }
};

//handleErros
const handleErrors = (code, error) => {
  switch (code) {
    case 401:
      Message("error", error.response.data.message, error.message);
      break;

    case 403:
      Message("error", error.response.data.message, error.message);
      break;

    case 404:
      Message("error", error.response.data.message, error.message);
      break;
  }
};
//set client authorization token here
export const setClientToken = (token: string | boolean | null) => {
  ACCESS_TOKEN = token;
};

let retry = false;
export const httpInstance = async () => {
  ACCESS_TOKEN = await getToken();
  axiosRequest.interceptors.request.use(
    (config) => {
      config.headers.baseURL = BASE_URL;
      config.headers.timeout = TIME_OUT;
      config.headers["Content-Type"] = "application/json";
      config.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //configure  response interceptors
  axiosRequest.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      const originalConfig = error.config;

      if (error.response.status === 401 && !retry) {
        try {
          const res = await axiosRequest.get("/auth/refresh");
          retry = true;
          const refreshToken = res.data.data.access_token;
          setToken(refreshToken);
          setClientToken(refreshToken);

          originalConfig.headers["Authorization"] = `Bearer ${refreshToken}`;
          return axiosRequest(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        retry = false;
        return Promise.reject(error);

        //   handleErrors(error.response.status, error);
      }
    }
  );

  return axiosRequest;
};

//create http client method
export const httpClient = () => {
  return authRequest;
};
