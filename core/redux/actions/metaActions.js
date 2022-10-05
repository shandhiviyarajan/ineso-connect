

export const META_TYPES = {
    // sites types
    UPDATE_GPS: "UPDATE_GPS",
    UPDATE_GPS_SUCCESS: "UPDATE_GPS_SUCCESS",
    UPDATE_GPS_FAIL: "UPDATE_GPS_FAIL",
};
//Fetch sites actions
export const ActionUpdateGPS = (payload) => {
    return {
        type: META_TYPES.UPDATE_GPS,
        payload,
    };
};

export const ActionUpdateGPSSuccess = (payload) => {
    return {
        type: META_TYPES.UPDATE_GPS_SUCCESS,
        payload,
    };
};

export const ActionUpdateGPSFail = (payload) => {
    return {
        type: META_TYPES.UPDATE_GPS_FAIL,
        payload,
    };
};