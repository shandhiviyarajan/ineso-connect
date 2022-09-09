

export const ALERT_TYPES = {
    // sites types
    GET_ALERTS: "GET_ALERTS",
    GET_ALERTS_SUCCESS: "GET_ALERTS_SUCCESS",
    GET_ALERTS_FAIL: "GET_ALERTS_FAIL",
};
//Fetch sites actions
export const ActionFetchAlert = (payload) => {
    return {
        type: ALERT_TYPES.GET_ALERTS,
        payload,
    };
};

export const ActionFetchAlertSuccess = (payload) => {
    return {
        type: ALERT_TYPES.GET_ALERTS_SUCCESS,
        payload,
    };
};

export const ActionFetchAlertFail = (payload) => {
    return {
        type: ALERT_TYPES.GET_ALERTS_FAIL,
        payload,
    };
};