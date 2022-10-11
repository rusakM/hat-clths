import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  signUpError: null,
  isFetching: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.CHANGE_PASSWORD_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.CHANGE_PASSWORD_SUCCESS:
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.CHANGE_PASSWORD_FAILURE:
    case UserActionTypes.RESET_PASSWORD_FAILURE:
    case UserActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.payload,
      };
    case UserActionTypes.USER_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
