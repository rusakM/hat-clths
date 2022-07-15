import { takeLatest, call, all, put } from "redux-saga/effects";
import ProductActionTypes from "./product.types";

import { getDocuments } from "../../api/category.functions";

import { fetchProductsSuccess, fetchProductsFailure } from "./product.actions";

export function* fetchProductsStart({ payload }) {
  try {
    const products = yield getDocuments(payload);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* onFetchingProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProductsStart);
}

export function* productsSagas() {
  yield all([call(onFetchingProductsStart)]);
}
