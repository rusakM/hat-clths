import { takeLatest, call, all, put } from "redux-saga/effects";
import RecommendationsActionTypes from "./recommendations.types";

import {
  getGenderBasedRecommendations,
  getSimilarProducts,
  getRecommendations,
} from "../../api/recommendations.functions";

import {
  fetchGenderBasedRecommendationsSuccess,
  fetchGenderBasedRecommendationsFailure,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
  fetchSimilarProductsSuccess,
  fetchSimilarProductsFailure,
} from "./recommendations.actions";

export function* fetchGenderBasedRecommendationsStart({ payload }) {
  try {
    const products = yield getGenderBasedRecommendations(payload);

    yield put(fetchGenderBasedRecommendationsSuccess(products));
  } catch (error) {
    yield put(fetchGenderBasedRecommendationsFailure(error));
  }
}

export function* fetchRecommendationsStart() {
  try {
    const products = yield getRecommendations();

    yield put(fetchRecommendationsSuccess(products));
  } catch (error) {
    yield put(fetchRecommendationsFailure(error));
  }
}

export function* fetchSimilarProductsStart({ payload }) {
  try {
    const products = yield getSimilarProducts(payload);

    yield put(fetchSimilarProductsSuccess(products));
  } catch (error) {
    yield put(fetchSimilarProductsFailure(error));
  }
}

export function* onFetchingGenderBasedRecommendationsStart() {
  yield takeLatest(
    RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_START,
    fetchGenderBasedRecommendationsStart
  );
}

export function* onFetchingRecommendationsStart() {
  yield takeLatest(
    RecommendationsActionTypes.FETCH_RECOMMENDATIONS_START,
    fetchRecommendationsStart
  );
}

export function* onFetchingSimilarProductsStart() {
  yield takeLatest(
    RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_START,
    fetchSimilarProductsStart
  );
}

export function* recommendationsSagas() {
  yield all([
    call(onFetchingGenderBasedRecommendationsStart),
    call(onFetchingRecommendationsStart),
    call(onFetchingSimilarProductsStart),
  ]);
}
