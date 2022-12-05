

export const GROUP_TYPES = {
    // sites types
    GET_GROUP: "GET_GROUP",
    GET_GROUP_SUCCESS: "GET_GROUP_SUCCESS",
    GET_GROUP_FAIL: "GET_GROUP_FAIL",


};
//Fetch sites actions
export const ActionFetchGroups = (payload) => {
    return {
        type: GROUP_TYPES.GET_GROUP,
        payload,
    };
};

export const ActionFetchGroupsSuccess = (payload) => {
    return {
        type: GROUP_TYPES.GET_GROUP_SUCCESS,
        payload,
    };
};

export const ActionFetchGroupsFail = (payload) => {
    return {
        type: GROUP_TYPES.GET_GROUP_FAIL,
        payload,
    };
};