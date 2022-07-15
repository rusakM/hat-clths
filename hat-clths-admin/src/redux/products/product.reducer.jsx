import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: {},
  isFetching: false,
  error: undefined,
  product: {},
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
    case ProductActionTypes.FETCH_ONE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      const products = state.products;
      products[state.fetchingCategory] = action.payload;
      return {
        ...state,
        isFetching: false,
        products,
      };
    case ProductActionTypes.FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
    case ProductActionTypes.FETCH_ONE_PRODUCT_FAILURE:
      return {
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
