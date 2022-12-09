

import { httpInstance } from "../interceptors/interceptors";

export const COMMAND = {
    DEVICE_COMMAND: (clientId, deviceId) => `/clients/${clientId}/devices/${deviceId}/command`,
};

//command device
export const apiDeviceCommand = async ({ clientId, deviceId, payload }) => {
    console.log(clientId, deviceId, payload);
    return await new Promise(async (resolve, reject) => {
        const httpRequest = await httpInstance();
        httpRequest.post(COMMAND.DEVICE_COMMAND(clientId, deviceId), payload)
            .then((response) => {
                resolve(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};