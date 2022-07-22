import CategoryActionTypes from "./category.types";
import { getElementIdInArray } from "./category.utils";

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
  error: undefined,
  editorVisible: false,
  categoryToEdit: undefined,
  categoryTempData: undefined,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.TOGGLE_EDITOR_VISIBILITY:
      return {
        ...state,
        editorVisible: !state.editorVisible,
        categoryToEdit: !state.editorVisible ? action.payload : undefined,
        categoryTempData: undefined,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CategoryActionTypes.CREATE_CATEGORY_START:
    case CategoryActionTypes.UPDATE_CATEGORY_START:
      return {
        ...state,
        isFetching: true,
        categoryTempData: action.payload,
      };
    case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
      state.categories.push(action.payload);
      return {
        ...state,
        isFetching: false,
        categoryTempData: undefined,
      };
    case CategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
      const { _id } = action.payload;
      const { categories } = state;
      categories[getElementIdInArray(categories, _id)] = action.payload;

      return {
        ...state,
        isFetching: false,
        categoryTempData: undefined,
        categories,
      };
    case CategoryActionTypes.CREATE_CATEGORY_FAILURE:
    case CategoryActionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        categoryTempData: undefined,
      };
    default:
      return state;
  }
};

export default categoryReducer;
