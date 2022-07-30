import { takeLatest, call, all, put } from "redux-saga/effects";
import CategoryActionTypes from "./category.types";

import {
  getDocuments,
  createDocuments,
  updateDocuments,
} from "../../api/category.functions";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategorySuccess,
  createCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
} from "./category.actions";

export function* fetchCategoriesStart() {
  try {
    const categories = yield getDocuments();
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* createCategoryStart({ payload }) {
  try {
    const category = yield createDocuments(payload);

    yield put(createCategorySuccess(category));
  } catch (error) {
    yield put(createCategoryFailure(error));
  }
}

export function* updateCategoryStart({ payload }) {
  try {
    const { id, name, gender } = payload;
    const category = yield updateDocuments({ name, gender }, id);

    yield put(updateCategorySuccess(category));
  } catch (error) {
    yield put(updateCategoryFailure(error));
  }
}

export function* onFetchingCategoriesStart() {
  yield takeLatest(
    CategoryActionTypes.FETCH_CATEGORIES_START,
    fetchCategoriesStart
  );
}

export function* onCreatingCategoryStart() {
  yield takeLatest(
    CategoryActionTypes.CREATE_CATEGORY_START,
    createCategoryStart
  );
}

export function* onUpdatingCategoryStart() {
  yield takeLatest(
    CategoryActionTypes.UPDATE_CATEGORY_START,
    updateCategoryStart
  );
}

export function* categorySagas() {
  yield all([
    call(onFetchingCategoriesStart),
    call(onCreatingCategoryStart),
    call(onUpdatingCategoryStart),
  ]);
}
