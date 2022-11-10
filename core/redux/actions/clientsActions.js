

export const CLIENT_TYPES = {
    // ApiAuth types
    GET_CLIENT: "GET_CLIENT",
    GET_CLIENT_SUCCESS: "GET_CLIENT_SUCCESS",
    GET_CLIENT_FAIL: "GET_CLIENT_FAIL",

    GET_CLIENTS: "GET_CLIENTS",
    GET_CLIENTS_SUCCESS: "GET_CLIENTS_SUCCESS",
    GET_CLIENTS_FAIL: "GET_CLIENTS_FAIL",

    SET_CLIENT_ID: "SET_CLIENT_ID",
    SET_SITE_ID: "SET_SITE_ID",
    SET_GROUP_ID: "SET_GROUP_ID",

};
//Fetch client actions
export const ActionFetchClients = () => {
    console.log("fetching cients...");
    return {
        type: CLIENT_TYPES.GET_CLIENTS
    };
};

export const ActionFetchClientsSuccess = (payload) => {
    return {
        type: CLIENT_TYPES.GET_CLIENTS_SUCCESS,
        payload,
    };
};

export const ActionFetchClientsFail = (payload) => {
    return {
        type: CLIENT_TYPES.GET_CLIENTS_FAIL,
        payload,
    };
};


export const ActionFetchClient = (payload) => {
    return {
        type: CLIENT_TYPES.GET_CLIENT,
        payload,
    };
};

export const ActionFetchClientSuccess = (payload) => {
    return {
        type: CLIENT_TYPES.GET_CLIENT_SUCCESS,
        payload,
    };
};

export const ActionFetchClientFail = (payload) => {
    return {
        type: CLIENT_TYPES.GET_CLIENT_FAIL,
        payload,
    };
};

export const ActionSetClientId = (payload) => {
    return {
        type: CLIENT_TYPES.SET_CLIENT_ID,
        payload,
    };
};

export const ActionSetSiteId = (payload) => {
    return {
        type: CLIENT_TYPES.SET_SITE_ID,
        payload,
    };
};

export const ActionSetGroupId = (payload) => {
    return {
        type: CLIENT_TYPES.SET_GROUP_ID,
        payload,
    };
};