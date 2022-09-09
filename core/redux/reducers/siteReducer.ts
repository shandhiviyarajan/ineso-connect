import { SITES_TYPES } from "../actions/siteActions";

const initialState = {
  sites: {
    isLoasding: false,
    data: null,
    erros: false,
  },
};

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SITES_TYPES.GET_SITES:
      return {
        ...state,
        sites: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case SITES_TYPES.GET_SITES_SUCCESS:
      return {
        ...state,

        sites: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case SITES_TYPES.GET_SITES_FAIL:
      return {
        ...state,
        sites: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};

export default siteReducer;
