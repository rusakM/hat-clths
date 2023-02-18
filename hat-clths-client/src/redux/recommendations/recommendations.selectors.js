import { createSelector } from "reselect";

const selectRecommendations = (state) => state.recommendations;
const defaultList = [];

export const selectSimilarProducts = createSelector(
  [selectRecommendations],
  (recommendations) =>
    recommendations.similarProducts
      ? recommendations.similarProducts
      : defaultList
);

export const selectRecommendedProducts = createSelector(
  [selectRecommendations],
  (recommendations) =>
    recommendations.recommendedProducts
      ? recommendations.recommendedProducts
      : defaultList
);

export const selectGenderBasedRecommendations = createSelector(
  [selectRecommendations],
  (recommendations) =>
    recommendations.genderBasedRecommendations
      ? recommendations.genderBasedRecommendations
      : defaultList
);

export const selectRecommendationsIsFetching = createSelector(
  [selectRecommendations],
  (recommendations) => recommendations.isFetchingRecommendations
);

export const selectGenderBasedRecommendationsIsFetching = createSelector(
  [selectRecommendations],
  (recommendations) => recommendations.isFetchingGenderBasedRecommendations
);

export const selectSimilarProductsIsFetching = createSelector(
  [selectRecommendations],
  (recommendations) => recommendations.isFetchingSimilarProducts
);

export const selectRecommendationsError = createSelector(
  [selectRecommendations],
  (recommendations) => recommendations.error
);
