import { all, call, takeLatest, put } from "redux-saga/effects";
import bookingTypes from "./booking.types";
import {
  fetchBookingSuccess,
  fetchBookingFailure,
  createBookingSuccess,
  createBookingFailure,
  payForBookingSuccess,
  payForBookingFailure,
  fetchBookingListSuccess,
  fetchBookingListFailure,
} from "./booking.actions";

import {
  getBooking,
  createBooking,
  payForBooking,
  getBookingList,
} from "../../api/booking.functions";

export function* fetchBookingStart({ payload: { bookingId, accessToken } }) {
  try {
    const booking = yield getBooking(bookingId, accessToken);
    yield put(fetchBookingSuccess(booking));
  } catch (error) {
    yield put(fetchBookingFailure(error));
  }
}

export function* fetchBookingListStart() {
  try {
    const bookingList = yield getBookingList();

    yield put(fetchBookingListSuccess(bookingList));
  } catch (error) {
    yield put(fetchBookingListFailure(error));
  }
}

export function* createBookingStart({ payload }) {
  try {
    const booking = yield createBooking(payload);

    yield put(createBookingSuccess(booking));
  } catch (error) {
    yield put(createBookingFailure(error));
  }
}

export function* payForBookingStart({ payload: { bookingId, accessToken } }) {
  try {
    const booking = yield payForBooking(bookingId, accessToken);

    yield put(payForBookingSuccess(booking));
  } catch (error) {
    yield put(payForBookingFailure(error));
  }
}

export function* onCreatingBookingStart() {
  yield takeLatest(bookingTypes.CREATE_BOOKING_START, createBookingStart);
}

export function* onFetchingBookingStart() {
  yield takeLatest(bookingTypes.FETCH_BOOKING_START, fetchBookingStart);
}

export function* onFetchingBookingListStart() {
  yield takeLatest(
    bookingTypes.FETCH_BOOKING_LIST_START,
    fetchBookingListStart
  );
}

export function* onPayingForBookingStart() {
  yield takeLatest(bookingTypes.PAY_FOR_BOOKING_START, payForBookingStart);
}

export function* bookingSagas() {
  yield all([
    call(onFetchingBookingStart),
    call(onCreatingBookingStart),
    call(onPayingForBookingStart),
    call(onFetchingBookingListStart),
  ]);
}
