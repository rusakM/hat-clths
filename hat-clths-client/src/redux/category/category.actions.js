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

export const toggleEditorVisibility = (categoryName) => ({
  type: CategoryActionTypes.TOGGLE_EDITOR_VISIBILITY,
  payload: categoryName,
});

export const createCategoryStart = (categoryData) => ({
  type: CategoryActionTypes.CREATE_CATEGORY_START,
  payload: categoryData,
});

export const updateCategoryStart = (categoryData) => ({
  type: CategoryActionTypes.UPDATE_CATEGORY_START,
  payload: categoryData,
});

export const createCategorySuccess = (categoryData) => ({
  type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
  payload: categoryData,
});

export const updateCategorySuccess = (categoryData) => ({
  type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS,
  payload: categoryData,
});

export const createCategoryFailure = (error) => ({
  type: CategoryActionTypes.CREATE_CATEGORY_FAILURE,
  payload: error,
});

export const updateCategoryFailure = (error) => ({
  type: CategoryActionTypes.UPDATE_CATEGORY_FAILURE,
  payload: error,
});
