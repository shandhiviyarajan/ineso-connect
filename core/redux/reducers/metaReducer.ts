import { META_TYPES } from "../actions/metaActions";

const initialState = {
  update: {
    isLoasding: false,
    data: null,
    erros: false,
  },
};

const metaReducer = (state = initialState, action) => {
  switch (action.type) {
    case META_TYPES.UPDATE_GPS:
      return {
        ...state,
        update: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };

    case META_TYPES.UPDATE_GPS_SUCCESS:
      return {
        ...state,

        update: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case META_TYPES.UPDATE_GPS_FAIL:
      return {
        ...state,
        update: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};

export default metaReducer;
