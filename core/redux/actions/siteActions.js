

export const SITES_TYPES = {
    // sites types
    GET_SITES: "GET_SITES",
    GET_SITES_SUCCESS: "GET_SITES_SUCCESS",
    GET_SITES_FAIL: "GET_SITES_FAIL",
};
//Fetch sites actions
export const ActionFetchSites = (payload) => {
    return {
        type: SITES_TYPES.GET_SITES,
        payload,
    };
};

export const ActionFetchSitesSuccess = (payload) => {
    return {
        type: SITES_TYPES.GET_SITES_SUCCESS,
        payload,
    };
};

export const ActionFetchSitesFail = (payload) => {
    return {
        type: SITES_TYPES.GET_SITES_FAIL,
        payload,
    };
};