import { PROFILE_TYPES } from "../actions/profileActions";

const initialState = {
  profile: null,
  more: null,
  isLoading: false,
  error: null,
  isSaving: false,
  fileStatus: null,
  profile_edit: {
    isSaving: false,
    data: null,
    error: null,
  },
  general_edit: {
    isSaving: false,
    data: null,
    error: null,
  },
  percentage: {
    isLoading: false,
    data: null,
    error: null,
  },
  upload_picture: {
    isUploading: false,
    data: null,
    error: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    //get profile
    case PROFILE_TYPES.GET_USER:
      return { ...state, profile: null, isLoading: true, error: null };

    case PROFILE_TYPES.GET_USER_SUCCESS:
      return {
        ...state,
        profile: action.response && action.response.data,
        isLoading: false,
        error: null,
      };

    case PROFILE_TYPES.GET_USER_FAIL:
      return {
        ...state,
        profile: null,
        isLoading: false,
        error: action.error,
      };

    // more general profile information
    case PROFILE_TYPES.MORE_INFO:
      return { ...state, more: null, isLoading: true, error: null };

    case PROFILE_TYPES.MORE_INFO_SUCCESS:
      return {
        ...state,
        more: action.response && action.response.data,
        isLoading: false,
        error: null,
      };

    case PROFILE_TYPES.MORE_INFO_FAIL:
      return { ...state, more: null, isLoading: false, error: action.error };

    //profile user edit
    case PROFILE_TYPES.EDIT_PROFILE:
      return {
        ...state,
        profile_edit: {
          isSaving: true,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile:
          action.response && action.response.data ? action.response.data : null,
        profile_edit: {
          isSaving: false,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.EDIT_PROFILE_FAIL:
      return {
        ...state,
        profile_edit: {
          isSaving: false,
          data: null,
          error: action.error,
        },
      };

    //edit general info

    case PROFILE_TYPES.EDIT_GENERAL_PROFILE:
      return {
        ...state,
        general_edit: {
          isSaving: true,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.EDIT_GENERAL_PROFILE_SUCCESS:
      return {
        ...state,
        more:
          action.response && action.response.data ? action.response.data : null,
        general_edit: {
          isSaving: false,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.EDIT_GENERAL_PROFILE_FAIL:
      return {
        ...state,
        general_edit: {
          isSaving: false,
          data: null,
          error: action.error,
        },
      };
    //get file status

    case PROFILE_TYPES.GET_FILE_STATUS:
      return { ...state, isLoading: true, fileStatus: false };

    case PROFILE_TYPES.GET_FILE_STATUS_SUCCESS:
      return { ...state, isLoading: false, fileStatus: action.response };

    case PROFILE_TYPES.GET_FILE_STATUS_FAIL:
      return { ...state, isLoading: false, fileStatus: action.error };

    //get percentage
    case PROFILE_TYPES.GET_PERCENTAGE:
      return {
        ...state,
        percentage: {
          isLoading: true,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.GET_PERCENTAGE_SUCCESS:
      return {
        ...state,
        percentage: {
          isLoading: false,
          data:
            action.percentage && action.percentage && action.percentage.data,
          error: null,
        },
      };

    case PROFILE_TYPES.GET_PERCENTAGE_FAIL:
      return {
        ...state,
        percentage: {
          isLoading: false,
          data: null,
          error: action.error,
        },
      };

    case PROFILE_TYPES.UPLOAD_PROFIE_PICTURE:
      return {
        ...state,

        upload_picture: {
          isUploading: true,
          data: null,
          error: null,
        },
      };

    case PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_SUCCESS:
      return {
        ...state,

        upload_picture: {
          isUploading: false,
          data: action.response,
          error: null,
        },
      };

    case PROFILE_TYPES.UPLOAD_PROFIE_PICTURE_FAIL:
      return {
        ...state,

        upload_picture: {
          isUploading: false,
          data: null,
          error: action.error,
        },
      };

    //get profile picture

    case PROFILE_TYPES.GET_PROFILE_PIC:
      return {
        ...state,
        picture: {
          isLoading: true,
        },
      };

    case PROFILE_TYPES.GET_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        picture: {
          isLoading: false,
          data: action.response,
          error: "",
        },
      };

    case PROFILE_TYPES.GET_PROFILE_PIC_FAIL:
      return {
        ...state,
        picture: {
          isLoading: false,
          data: "",
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
