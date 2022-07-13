import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInWithEmailAndPassword,
  logout,
  getCurrentUser,
} from "../../api/user.functions";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from "./user.actions";

export function* signIn({ payload: { email, password } }) {
  try {
    const user = yield signInWithEmailAndPassword(email, password);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
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

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}
