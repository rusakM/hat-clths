import CategoryActionTypes from "./category.types";

export const fetchCategoriesStart = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categoriesMap) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categoriesMap,
});

export const fetchCategoriesFailure = (error) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
  payload: error,
});
