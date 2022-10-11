import UserActionTypes from "./user.types";

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signInStart = (emailAndPassword) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userData) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userData,
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const googleSignInStart = (credentials) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  payload: credentials,
});

export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInFailure = (error) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error,
});

export const changePasswordStart = (passwordData) => ({
  type: UserActionTypes.CHANGE_PASSWORD_START,
  payload: passwordData,
});

export const changePasswordSuccess = (userData) => ({
  type: UserActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: userData,
});

export const changePasswordFailure = (error) => ({
  type: UserActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});

export const resetPasswordStart = (passwordData, token) => ({
  type: UserActionTypes.RESET_PASSWORD_START,
  payload: { passwordData, token },
});

export const resetPasswordSuccess = (userData) => ({
  type: UserActionTypes.RESET_PASSWORD_SUCCESS,
  payload: userData,
});

export const resetPasswordFailure = (error) => ({
  type: UserActionTypes.RESET_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPasswordStart = (email) => ({
  type: UserActionTypes.FORGOT_PASSWORD_START,
  payload: email,
});

export const forgotPasswordSuccess = (userData) => ({
  type: UserActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: userData,
});

export const forgotPasswordFailure = (error) => ({
  type: UserActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const userErrorClear = () => ({
  type: UserActionTypes.USER_ERROR_CLEAR,
});
