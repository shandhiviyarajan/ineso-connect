import { PROFILE_TYPES } from "../actions/profileActions";

const initialState = {
  profile: null,
  more: null,
  isLoading: false,
  error: null,
  isSaving: false,
  fileStatus: null,
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

    default:
      return state;
  }
};

export default profileReducer;
