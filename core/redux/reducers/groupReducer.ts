import { GROUP_TYPES } from "../actions/groupActions";

const initialState = {
  groups: {
    isLoasding: false,
    data: null,
    erros: false,
  },
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_TYPES.GET_GROUP:
      return {
        ...state,
        groups: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case GROUP_TYPES.GET_GROUP_SUCCESS:
      return {
        ...state,

        groups: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case GROUP_TYPES.GET_GROUP_FAIL:
      return {
        ...state,
        groups: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};

export default groupReducer;
