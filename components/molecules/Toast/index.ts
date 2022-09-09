import React from 'react';
import Toast,  { BaseToast, ErrorToast } from 'react-native-toast-message';

export const Message = (type:string, title:string, message:string) =>{
    Toast.show({
        type: type,
        text1: title,
        text2: message
      });
};

export const toastConfig = {
  
}