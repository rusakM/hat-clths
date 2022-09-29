import ErrorTypes from "./error.types";

const INITIAL_STATE = {
  message: "",
  error: 404,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ErrorTypes.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case ErrorTypes.CLEAR_ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default errorReducer;
