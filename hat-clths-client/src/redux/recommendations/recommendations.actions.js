import RecommendationsActionTypes from "./recommendations.types";

export const fetchRecommendationsStart = () => ({
  type: RecommendationsActionTypes.FETCH_RECOMMENDATIONS_START,
});

export const fetchRecommendationsSuccess = (products) => ({
  type: RecommendationsActionTypes.FETCH_RECOMMENDATIONS_SUCCESS,
  payload: products,
});

export const fetchRecommendationsFailure = (error) => ({
  type: RecommendationsActionTypes.FETCH_RECOMMENDATIONS_FAILURE,
  payload: error,
});

export const fetchSimilarProductsStart = (productId) => ({
  type: RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_START,
  payload: productId,
});

export const fetchSimilarProductsSuccess = (products) => ({
  type: RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchSimilarProductsFailure = (error) => ({
  type: RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchGenderBasedRecommendationsStart = (gender) => ({
  type: RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_START,
  payload: gender,
});

export const fetchGenderBasedRecommendationsSuccess = (products) => ({
  type: RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_SUCCESS,
  payload: products,
});

export const fetchGenderBasedRecommendationsFailure = (error) => ({
  type: RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_ERROR,
  payload: error,
});
