import { takeLatest, call, all, put } from "redux-saga/effects";
import ProductActionTypes from "./product.types";

import { getDocuments } from "../../api/category.functions";
import {
  getNewProducts,
  getProduct,
  createNewProduct,
  updateProduct,
} from "../../api/product.functions";

import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchOneProductSuccess,
  fetchOneProductFailure,
  createProductFailure,
  updateProductFailure,
  createProductSuccess,
  updateProductSuccess,
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

export function* createProductStart({ payload }) {
  try {
    const product = yield createNewProduct(payload);

    yield put(createProductSuccess(product));
  } catch (error) {
    yield put(createProductFailure(error));
  }
}

export function* updateProductStart({ payload: { id, form } }) {
  try {
    const product = yield updateProduct(form, id);

    yield put(updateProductSuccess(product));
  } catch (error) {
    yield put(updateProductFailure(error));
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

export function* onCreatingProductStart() {
  yield takeLatest(ProductActionTypes.CREATE_PRODUCT_START, createProductStart);
}

export function* onUpdatingProductStart() {
  yield takeLatest(ProductActionTypes.UPDATE_PRODUCT_START, updateProductStart);
}

export function* productsSagas() {
  yield all([
    call(onFetchingProductsStart),
    call(onFetchingOneProductStart),
    call(onCreatingProductStart),
    call(onUpdatingProductStart),
  ]);
}
