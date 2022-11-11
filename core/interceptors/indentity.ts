import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("reyreoqyreoqreq");
};

export const setAuthToken = async (token: any) => {
  return await AsyncStorage.setItem("reyreoqyreoqreq", token);
};
