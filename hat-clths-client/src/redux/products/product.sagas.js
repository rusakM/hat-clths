import { takeLatest, call, all, put } from "redux-saga/effects";
import ProductActionTypes from "./product.types";

import { getDocuments } from "../../api/category.functions";
import {
  getNewProducts,
  getProduct,
  getTopProducts,
} from "../../api/product.functions";

import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchOneProductSuccess,
  fetchOneProductFailure,
  fetchTopProductsSuccess,
  fetchTopProductsFailure,
} from "./product.actions";

export function* fetchProductsStart({ payload }) {
  try {
    let products;
    if (payload === "new") {
      products = yield getNewProducts();
    } else {
      products = yield getDocuments(payload);
    }
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* fetchOneProductStart({ payload }) {
  try {
    if (!payload) {
      yield put({});
    }
    const product = yield getProduct(payload);

    yield put(fetchOneProductSuccess(product));
  } catch (error) {
    yield put(fetchOneProductFailure(error));
  }
}

export function* fetchTopProductsStart({ payload }) {
  try {
    let limit = null;
    if (payload && payload.limit) {
      limit = payload.limit;
    }
    const products = yield getTopProducts(limit);

    yield put(fetchTopProductsSuccess(products));
  } catch (error) {
    yield put(fetchTopProductsFailure(error));
  }
}

export function* onFetchingProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProductsStart);
}

export function* onFetchingOneProductStart() {
  yield takeLatest(
    ProductActionTypes.FETCH_ONE_PRODUCT_START,
    fetchOneProductStart
  );
}

export function* onFetchingTopProductsStart() {
  yield takeLatest(
    ProductActionTypes.FETCH_TOP_PRODUCTS_START,
    fetchTopProductsStart
  );
}

export function* productsSagas() {
  yield all([
    call(onFetchingProductsStart),
    call(onFetchingOneProductStart),
    call(onFetchingTopProductsStart),
  ]);
}
