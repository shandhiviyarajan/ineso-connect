
import { Alert } from "react-native";
import { httpInstance } from "../interceptors/interceptors";

export const DEVICES = {
    GET_DEVICES: false,
    GET_DEVICE: (clientId, deviceId) => `/clients/${clientId}/devices/${deviceId}`,
    GET_DEVICE_CATEGORIES: (clientId) => `/clients/${clientId}/devices/categories`,
    GET_GROUP_CATEGORIES: (clientId, siteId, groupId) => `/clients/${clientId}/sites/${siteId}/groups/${groupId}/devices/categories`,
    GET_DEVICE_MEASUREMENT: (clientId, deviceId) => `/clients/${clientId}/devices/${deviceId}/measurement`,
    GET_SITE_DEVICES: (clientId, siteId) => `/clients/${clientId}/sites/${siteId}/devices`,
    GET_GROUP_DEVICES: (clientId, siteId, groupId) => `/clients/${clientId}/sites/${siteId}/groups/${groupId}/devices`
};


let httpRequest;
//Get all devices for client id
export const apiFetchDevices = async ({ clientId, siteId, groupId }) => {
    let url = false;
    if (clientId && siteId && groupId) {
        url = `/clients/${clientId}/sites/${siteId}/groups/${groupId}/devices`;
    } else if (clientId && siteId) {
        url = `/clients/${clientId}/sites/${siteId}/devices`;
    } else if (clientId) {
        url = `/clients/${clientId}/devices`;
    }
    return await new Promise(async (resolve, reject) => {
        httpRequest = await httpInstance();
        httpRequest.get(url)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });
};

//Get all devices categories
export const apiFetchDeviceCategories = async ({ clientId }) => {
    return await new Promise(async () => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_DEVICE_CATEGORIES(clientId))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    });
};

//fetch group categories
export const apiFetchGroupCategories = async ({ clientId, siteId, groupId }) => {
    return await new Promise(async () => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_GROUP_CATEGORIES(clientId, siteId, groupId))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    });
};


//Get all devices measurement
export const apiFetchDeviceMeasurement = async ({ clientId, deviceId }) => {
    return await new Promise(async () => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_DEVICE_MEASUREMENT(clientId, deviceId))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    });
};

//Get device by id
export const apiFetchDevice = async ({ clientId, deviceId }) => {
    return await new Promise(async (resolve, reject) => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_DEVICE(clientId, deviceId))
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            });
    });
};

//Get device by client, site ids
export const apiFetchSiteDevices = async ({ clientId, sideId }) => {
    return await new Promise(async () => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_SITE_DEVICES(clientId, sideId))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    });
};

//fetch group devices
export const apiFetchGroupDevices = async ({ clientId, siteId, groupId }) => {
    return await new Promise(async () => {
        httpRequest = await httpInstance();
        httpRequest.get(DEVICES.GET_GROUP_DEVICES(clientId, siteId, groupId))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    });
};


