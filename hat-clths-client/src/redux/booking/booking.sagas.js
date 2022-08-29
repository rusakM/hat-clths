import { all, call, takeLatest, put } from "redux-saga/effects";
import bookingTypes from "./booking.types";
import {
  fetchBookingSuccess,
  fetchBookingFailure,
  createBookingSuccess,
  createBookingFailure,
} from "./booking.actions";

// export function* fetchAddressStart() {
//   try {
//     const addressList = yield getMyAddresses();
//     console.log(addressList);
//     yield put(fetchAddressSuccess(addressList));
//   } catch (error) {
//     yield put(fetchAddressFailure(error));
//   }
// }

// export function* onFetchingAddressStart() {
//   yield takeLatest(addressTypes.FETCH_ADDRESS_START, fetchAddressStart);
// }

// export function* addressSagas() {
//   yield all([call(onFetchingAddressStart)]);
// }
