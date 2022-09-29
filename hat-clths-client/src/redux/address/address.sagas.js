import { all, call, takeLatest, put } from "redux-saga/effects";
import addressTypes from "./address.types";
import { getMyAddresses, deleteAddress } from "../../api/address.functions";
import {
  fetchAddressSuccess,
  fetchAddressFailure,
  deleteAddressSuccess,
  deleteAddressFailure,
} from "./address.actions";

export function* fetchAddressStart() {
  try {
    const addressList = yield getMyAddresses();
    console.log(addressList);
    yield put(fetchAddressSuccess(addressList));
  } catch (error) {
    yield put(fetchAddressFailure(error));
  }
}

export function* deleteAddressStart({ payload }) {
  try {
    yield deleteAddress(payload);
    yield put(deleteAddressSuccess(payload));
  } catch (error) {
    yield put(deleteAddressFailure(error));
  }
}

export function* onFetchingAddressStart() {
  yield takeLatest(addressTypes.FETCH_ADDRESS_START, fetchAddressStart);
}

export function* onDeletingAddressStart() {
  yield takeLatest(addressTypes.DELETE_ADDRESS_START, deleteAddressStart);
}

export function* addressSagas() {
  yield all([call(onFetchingAddressStart), call(onDeletingAddressStart)]);
}
