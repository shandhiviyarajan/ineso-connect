import { httpInstance } from "../interceptors/interceptors";

export const CLIENTS = {
    GET_ALERTS: (clientId, glounId) => `/clients/${clientId}/gluons/${glounId}/alerts`,
    UPDATE_STATE: (clientId, alertId) => `/clients/${clientId}/alerts/${alertId}/state`,
};

//fetch all clients
export const apiFetchAlerts = async ({
    clientId, glounId
}) => {
    const httpRequest = await httpInstance();
    return await new Promise((resolve, reject) => {
        httpRequest.get(CLIENTS.GET_ALERTS(clientId, glounId))
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

//update state

export const apiUpdateAlertState = async ({
    clientId, alertId, payload
}) => {

    const httpRequest = await httpInstance();
    return await new Promise((resolve, reject) => {
        console.log(httpRequest);
        httpRequest.post(CLIENTS.UPDATE_STATE(clientId, alertId), {
            "state": payload,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
