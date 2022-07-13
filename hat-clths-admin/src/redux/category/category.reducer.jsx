import CategoryActionTypes from "./category.types";

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
  error: undefined,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
