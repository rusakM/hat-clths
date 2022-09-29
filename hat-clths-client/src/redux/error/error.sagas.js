import { all, call, takeLatest, put } from "redux-saga/effects";
import bookingTypes from "../booking/booking.types";

import { setError } from "./error.actions";

export function* setBookingStart({ payload: { message, code } }) {
  yield put(setError(message, code || 404));
}

export function* onFetchingBookingError() {
  yield takeLatest(bookingTypes.FETCH_BOOKING_FAILURE, setBookingStart);
}

export function* errorSagas() {
  yield all([call(onFetchingBookingError)]);
}
