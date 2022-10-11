import { httpInstance } from "../interceptors/interceptors";

export const ACTIVATE = {
    SEARCH_DEVICE: (clientId, qr_code) => `/clients/${clientId}/devices/search?qrcodeId=${qr_code}`,
    ACTIVATE_DEVICE: (clientId, deviceId) => `/clients/${clientId}/devices/${deviceId}/activate`,
};

//search all devices by qrcode
export const apiSearchDevices = async ({
    clientId, qr_code
}) => {
    const httpRequest = await httpInstance();
    return await new Promise((resolve, reject) => {
        httpRequest.get(ACTIVATE.SEARCH_DEVICE(clientId, qr_code))
            .then((response) => {
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

