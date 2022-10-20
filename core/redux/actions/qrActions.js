

export const QR_TYPES = {
    // sites types
    SET_QR: "SET_QR",
    SET_PAYLOAD: "SET_PAYLOAD",
    SET_QR_SUCCESS: "SET_QR_SUCCESS",
    SET_QR_FAIL: "SET_QR_FAIL",

    ACTIVATE_DEVICE: "ACTIVATE_DEVICE",
    ACTIVATE_DEVICE_SUCCESS: "ACTIVATE_DEVICE_SUCCESS",
    ACTIVATE_DEVICE_FAIL: "ACTIVATE_DEVICE_FAIL",

    SEARCH_DEVICE: "SEARCH_DEVICE",
    SEARCH_DEVICE_SUCCESS: "SEARCH_DEVICE_SUCCESS",
    SEARCH_DEVICE_FAIL: "ACTIVATE_DEVICE_FAIL"
};

export const ActionUpdatePayload = (payload) => {
    return {
        type: QR_TYPES.SET_PAYLOAD,
        payload,
    };
}

//set QR code  sites actions
export const ActionSetQR = (payload) => {
    return {
        type: QR_TYPES.SET_QR,
        payload,
    };
};


export const ActionSearchDevice = (payload) => {
    return {
        type: QR_TYPES.SEARCH_DEVICE,
        payload,
    };
};
export const ActionSearchDeviceSuccess = (payload) => {
    return {
        type: QR_TYPES.SEARCH_DEVICE_SUCCESS,
        payload,
    };
};

export const ActionSearchDeviceFail = (payload) => {
    return {
        type: QR_TYPES.SEARCH_DEVICE_FAIL,
        payload,
    };
};

export const ActionActivateDevice = (payload) => {
    return {
        type: QR_TYPES.ACTIVATE_DEVICE,
        payload,
    };
};
export const ActionActivateDeviceSuccess = (payload) => {
    return {
        type: QR_TYPES.ACTIVATE_DEVICE_SUCCESS,
        payload,
    };
};

export const ActionActivateDeviceFail = (payload) => {
    return {
        type: QR_TYPES.ACTIVATE_DEVICE_FAIL,
        payload,
    };
};