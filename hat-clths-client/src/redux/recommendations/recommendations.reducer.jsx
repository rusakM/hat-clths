import RecommendationsActionTypes from "./recommendations.types";

const INITIAL_STATE = {
  similarProducts: [],
  recommendedProducts: [],
  genderBasedRecommendations: [],
  isFetchingRecommendations: false,
  isFetchingSimilarProducts: false,
  isFetchingGenderBasedRecommendations: false,
  error: undefined,
};

const recommendationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_START:
      return {
        ...state,
        isFetchingGenderBasedRecommendations: true,
      };
    case RecommendationsActionTypes.FETCH_RECOMMENDATIONS_START:
      return {
        ...state,
        isFetchingRecommendations: true,
      };
    case RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_START:
      return {
        ...state,
        isFetchingSimilarProducts: true,
      };
    case RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        isFetchingGenderBasedRecommendations: false,
        genderBasedRecommendations: action.payload,
      };
    case RecommendationsActionTypes.FETCH_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        isFetchingRecommendations: false,
        recommendedProducts: action.payload,
      };
    case RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetchingSimilarProducts: false,
        similarProducts: action.payload,
      };
    case RecommendationsActionTypes.FETCH_GENDER_BASED_RECOMMENDATIONS_ERROR:
      return {
        ...state,
        isFetchingGenderBasedRecommendations: false,
        error: action.payload,
      };
    case RecommendationsActionTypes.FETCH_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        isFetchingRecommendations: false,
        error: action.payload,
      };
    case RecommendationsActionTypes.FETCH_SIMILAR_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetchingSimilarProducts: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recommendationsReducer;
