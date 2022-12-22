

export const DEVICE_TYPES = {
    // sites types
    GET_DEVICES: "GET_DEVICES",
    GET_DEVICES_SUCCESS: "GET_DEVICES_SUCCESS",
    GET_DEVICES_FAIL: "GET_DEVICES_FAIL",

    GET_DEVICE: "GET_DEVICE",
    GET_DEVICE_SUCCESS: "GET_DEVICE_SUCCESS",
    GET_DEVICE_FAIL: "GET_DEVICE_FAIL",

    SYNC_DEVICE: "SYNC_DEVICE",
    SYNC_DEVICE_SUCCESS: "SYNC_DEVICE_SUCCESS",

    GET_SEARCH: "GET_SEARCH"
};
//Fetch sites actions
export const ActionFetchDevices = (payload) => {
    console.log("fetch device", payload);
    return {
        type: DEVICE_TYPES.GET_DEVICES,
        payload,
    };
};

export const ActionFetchDevicesSuccess = (payload) => {
    return {
        type: DEVICE_TYPES.GET_DEVICES_SUCCESS,
        payload,
    };
};

export const ActionFetchDevicesFail = (payload) => {
    return {
        type: DEVICE_TYPES.GET_DEVICES_FAIL,
        payload,
    };
};

export const ActionSyncDevice = (payload) => {
    return {
        type: DEVICE_TYPES.SYNC_DEVICE,
        payload,
    };
};

export const ActionFetchDevice = (payload) => {
    return {
        type: DEVICE_TYPES.GET_DEVICE,
        payload,
    };
};

export const ActionFetchDeviceSuccess = (payload) => {
    return {
        type: DEVICE_TYPES.GET_DEVICE_SUCCESS,
        payload,
    };
};

export const ActionFetchDeviceFail = (payload) => {
    return {
        type: DEVICE_TYPES.GET_DEVICE_FAIL,
        payload,
    };
};

export const ActionSearchDevices = (payload) => {
    return {
        type: DEVICE_TYPES.GET_SEARCH,
        payload,
    };
};