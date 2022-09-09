
import { httpInstance } from "../interceptors/interceptors";

export const SITES = {
    GET_SITES: (clientId) => `/clients/${clientId}/sites`,
    GET_GROUPS: (clientId, siteId) => `/clients/${clientId}/sites/${siteId}/groups`
};
let httpRequest;
//fetch all sites
export const apiFetchSites = async ({ clientId }) => {
    httpRequest = await httpInstance();
    return await new Promise((resolve, reject) => {
        httpRequest.get(SITES.GET_SITES(clientId))
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {

                reject(error);
            });
    });
};

//fetch all groups
export const apiFetchGroups = async ({ clientId, siteId }) => {
    httpRequest = await httpInstance();
    return await new Promise((resolve, reject) => {
        httpRequest.get(SITES.GET_GROUPS(clientId, siteId))
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            });
    });
};
