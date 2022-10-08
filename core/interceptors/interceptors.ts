import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, LogBox } from "react-native";
import { Message } from "../../components/molecules/Toast";
import jwt_decode from "jwt-decode";
//set default api url
let BASE_URL = "https://connect-staging.inesocompany.com/api";
let TIME_OUT = 50000;
let ACCESS_TOKEN: any = false;
let axiosRequest = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

let refreshCall = true;

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
    //const originalRequest = error.config;
    //handle refresh token here
    return Promise.reject(error);
  }
);
axiosRequest.interceptors.request.use(
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
axiosRequest.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    //const originalRequest = error.config;
    //handle refresh token here
    return Promise.reject(error);
  }
);

export const setToken = async (value: any) => {
  await AsyncStorage.setItem("@access_token", value);
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
    case 403:
      Message("error", error.response.data.message, error.message);
      break;

    case 404:
      Message("error", error.response.data.message, error.message);
      break;
  }
};
//create axios instance
const APIKit = axiosRequest;

const APIUpload = axiosRequest;

//set client authorization token here
export const setClientToken = (token: string | boolean | null) => {
  ACCESS_TOKEN = token;

  APIKit.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      let code = error.response.status;
      handleErrors(code, error);
      return Promise.reject(error);
    }
  );

  APIUpload.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "multipart/form-data";
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      let code = error.response.status;
      handleErrors(code, error);
      return Promise.reject(error);
    }
  );
};

export const httpInstance = async () => {
  ACCESS_TOKEN = await getToken();

  console.log(ACCESS_TOKEN);
  //not expired
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
    (error) => {
      //handle refresh token here
      handleErrors(error.response.status, error);
      return Promise.reject(error);
    }
  );

  return axiosRequest;
};
export const httpUpload = APIUpload;

//create http client method
export const httpClient = () => {
  return authRequest;
};
