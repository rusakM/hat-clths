import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInWithEmailAndPassword,
  logout,
  getCurrentUser,
  signUp,
  validateNewUser,
  loginWithGoogle,
} from "../../api/user.functions";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  googleSignInSuccess,
  googleSignInFailure,
} from "./user.actions";

export function* signIn({ payload: { email, password } }) {
  try {
    const user = yield signInWithEmailAndPassword(email, password);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle({ payload }) {
  try {
    const user = yield loginWithGoogle(payload);
    yield put(googleSignInSuccess(user));
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* signUpNewUser({ payload }) {
  try {
    validateNewUser(payload);
    const user = yield signUp(payload);
    yield put(signUpSuccess(user));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signOut() {
  try {
    yield logout();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) {
      return;
    }
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpNewUser);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignInWithGoogleStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignInWithGoogleStart),
  ]);
}
