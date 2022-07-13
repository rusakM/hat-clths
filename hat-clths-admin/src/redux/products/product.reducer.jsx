import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: {},
  isFetching: false,
  error: undefined,
  fetchingCategory: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
        fetchingCategory: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      const products = state.products;
      products[state.fetchingCategory] = action.payload;
      return {
        ...state,
        isFetching: false,
        products,
        fetchingCategory: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        isFetching: false,
        fetchingCategory: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
