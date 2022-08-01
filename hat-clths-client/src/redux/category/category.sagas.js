import { takeLatest, call, all, put } from "redux-saga/effects";
import CategoryActionTypes from "./category.types";

import { getDocuments } from "../../api/category.functions";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./category.actions";

export function* fetchCategoriesStart() {
  try {
    const categories = yield getDocuments();
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchingCategoriesStart() {
  yield takeLatest(
    CategoryActionTypes.FETCH_CATEGORIES_START,
    fetchCategoriesStart
  );
}

export function* categorySagas() {
  yield all([call(onFetchingCategoriesStart)]);
}
