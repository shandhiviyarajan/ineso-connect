import CryptoJS from "react-native-crypto-js"


const aesSecret = 'ineso est a fontaine 38600'
const aesEncrypt = async (id) => {
    return await CryptoJS.AES.encrypt(id, aesSecret).toString()
}

const aesDecrypt = (id) => {
    return CryptoJS.AES.decrypt(id, aesSecret).toString(CryptoJS.enc.Utf8)
}


export {
    aesDecrypt, aesEncrypt
}