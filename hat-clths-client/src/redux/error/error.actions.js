import ErrorTypes from "./error.types";

export const setError = (message, code) => ({
  type: ErrorTypes.SET_ERROR,
  payload: { message, code },
});

export const clearError = () => ({
  type: ErrorTypes.CLEAR_ERROR,
});
