export const PROFILE_TYPES = {
  // Edit personal profile
  EDIT_PROFILE: 'EDIT_PROFILE',
  EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
  EDIT_PROFILE_FAIL: 'EDIT_PROFILE_FAIL',
  // Edit general profile
  EDIT_GENERAL_PROFILE: 'EDIT_GENERAL_PROFILE',
  EDIT_GENERAL_PROFILE_SUCCESS: 'EDIT_GENERAL_PROFILE_SUCCESS',
  EDIT_GENERAL_PROFILE_FAIL: 'EDIT_GENERAL_PROFILE_FAIL',
  //Get User actions
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAIL: 'GET_USER_FAIL',
  //get percentage
  GET_PERCENTAGE: 'GET_PERCENTAGE',
  GET_PERCENTAGE_FAIL: 'GET_PERCENTAGE_FAIL',
  GET_PERCENTAGE_SUCCESS: 'GET_PERCENTAGE_SUCCESS',
  //get file status
  GET_FILE_STATUS: 'GET_FILE_STATUS',
  GET_FILE_STATUS_SUCCESS: 'GET_FILE_STATUS_SUCCESS',
  GET_FILE_STATUS_FAIL: 'GET_FILE_STATUS_FAIL',
  //Get more info
  MORE_INFO: 'MORE_INFO',
  MORE_INFO_SUCCESS: 'MORE_INFO_SUCCESS',
  MORE_INFO_FAIL: 'MORE_INFO_FAIL',
  //upload profile fpicture
  UPLOAD_PROFIE_PICTURE: 'UPLOAD_PROFIE_PICTURE',
  UPLOAD_PROFIE_PICTURE_SUCCESS: 'UPLOAD_PROFIE_PICTURE_SUCCESS',
  UPLOAD_PROFIE_PICTURE_FAIL: 'UPLOAD_PROFIE_PICTURE_FAIL',
  //get profile picture
  GET_PROFILE_PIC: 'GET_PROFILE_PIC',
  GET_PROFILE_PIC_SUCCESS: 'GET_PROFILE_PIC_SUCCESS',
  GET_PROFILE_PIC_FAIL: 'GET_PROFILE_PIC_FAIL'
};
//GET User
export const GetUserAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_USER,
    payload,
  };
};
export const GetUserSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_USER_SUCCESS,
    payload,
  };
};
export const GetUserFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_USER_FAIL,
    payload,
  };
};
//Profile MORE INFO
export const MoreInfoAction = (payload) => {
  return {
    type: PROFILE_TYPES.MORE_INFO,
    payload,
  };
};
export const MoreInfoSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.MORE_INFO_SUCCESS,
    payload,
  };
};
export const MoreInfoFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.MORE_INFO_FAIL,
    payload,
  };
};
//Edit Personal Profile
export const EditProfileAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_PROFILE,
    payload,
  };
};
export const EditProfileSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_PROFILE_SUCCESS,
    payload,
  };
};
export const EditProfileFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_PROFILE_FAIL,
    payload,
  };
};
//Edit general profile
export const EditGeneralAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_GENERAL_PROFILE,
    payload,
  };
};
export const EditGeneralSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_GENERAL_PROFILE_SUCCESS,
    payload,
  };
};
export const EditGeneralFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.EDIT_GENERAL_PROFILE_FAIL,
    payload,
  };
};
//get file status
export const GetFileStatusAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_FILE_STATUS,
    payload,
  };
};
export const GetFileStatusSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_FILE_STATUS_SUCCESS,
    payload,
  };
};
export const GetFileStatusFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_FILE_STATUS_FAIL,
    payload,
  };
};
//get profile percentage
export const ProfilePercentageAction = (id) => {
  return {
    type: PROFILE_TYPES.GET_PERCENTAGE,
    id
  };
};
export const ProfilePercentageSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_PERCENTAGE_SUCCESS,
    payload
  };
};
export const ProfilePercentageFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_PERCENTAGE_FAIL,
    payload
  };
};
//upload profile picture
export const UploadProfilePicAction = (payload) => {
  return {
    type: PROFILE_TYPES.UPLOAD_PROFIE_PICTURE,
    payload
  };
};
export const UploadProfilePicSuccessAction = (payload) => {
  return {
    type: PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_SUCCESS,
    payload
  };
};
export const UploadProfilePicFailAction = (payload) => {
  return {
    type: PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_FAIL,
    payload
  };
};
//get profile pic
export const GetProfilePicAction = (payload) => {
  return {
    type: PROFILE_TYPES.GET_PROFILE_PIC,
    payload
  };
};

export const GetProfilePicSuccessAction = (payload) =>{
  return{
    type:PROFILE_TYPES.GET_PROFILE_PIC_SUCCESS,
    payload
  }
}
export const GetProfilePicFailAction = (payload) =>{
  return{
    type:PROFILE_TYPES.GET_PROFILE_PIC_FAIL,
    payload
  }
}
