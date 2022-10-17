import { Message } from "../../components/molecules/Toast";
import { httpInstance, httpRequest, httpUpload } from "../interceptors/interceptors";

export const CLIENTS = {
    GET_CLIENTS: `/auth/me/clients`,
    GET_CLIENT: (clientId) => `/clients/${clientId}`,
    GET_INESO_CONFIG: (clientId) => `/clients/${clientId}/ineso-config`,


};

//fetch all clients
export const apiFetchClients = async () => {
    return await new Promise(async (resolve, reject) => {
        const httpRequest = await httpInstance();
        httpRequest.get(CLIENTS.GET_CLIENTS)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
//fetch single client
export const apiFetchClient = async ({ clientId }) => {
    return await new Promise(async (resolve, reject) => {
        const httpRequest = await httpInstance();
        httpRequest.get(CLIENTS.GET_CLIENT(clientId))
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
//api get user
export const apiGetConfig = async ({ clientId }) => {
    return await new Promise(async (resolve, reject) => {
        const httpRequest = await httpInstance();
        httpRequest.get(PROFILE.GET_INESO_CONFIG({ clientId }))
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
