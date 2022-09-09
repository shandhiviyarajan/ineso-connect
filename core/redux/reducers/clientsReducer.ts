import { CLIENT_TYPES } from "../actions/clientsActions";

const initialState = {
  clients: {
    isLoasding: false,
    data: null,
    erros: false,
  },
  client: {
    isLoading: false,
    data: null,
    errors: false,
  },
  clientId: false,
  siteId: false,
  groupId: false,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_TYPES.SET_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload,
      };
    case CLIENT_TYPES.SET_SITE_ID:
      return {
        ...state,
        siteId: action.payload,
      };
    case CLIENT_TYPES.SET_GROUP_ID:
      return {
        ...state,
        groupId: action.payload,
      };

    case CLIENT_TYPES.GET_CLIENTS:
      return {
        ...state,
        clients: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };
    case CLIENT_TYPES.GET_CLIENTS_SUCCESS:
      return {
        ...state,

        clients: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case CLIENT_TYPES.GET_CLIENTS_FAIL:
      return {
        ...state,
        clients: {
          isLoading: false,
          data: null,
          errors: action.payload,
        },
      };

    case CLIENT_TYPES.GET_CLIENT:
      return {
        ...state,
        client: {
          isLoading: true,
          data: null,
          errors: false,
        },
      };
    case CLIENT_TYPES.GET_CLIENT_SUCCESS:
      return {
        ...state,

        client: {
          isLoading: false,
          data: action.payload,
          errors: false,
        },
      };
    case CLIENT_TYPES.GET_CLIENT_FAIL:

    default:
      return state;
  }
};

export default clientReducer;
