import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import bookingTypes from "../booking/booking.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnAction() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnAction);
}

export function* onCreateBookingSuccess() {
  yield takeLatest(bookingTypes.CREATE_BOOKING_SUCCESS, clearCartOnAction);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onCreateBookingSuccess)]);
}
