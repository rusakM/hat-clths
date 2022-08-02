import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: {},
  isFetching: false,
  error: undefined,
  fetchingCategory: undefined,
  product: {},
  productId: undefined,
  topProducts: {},
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
        fetchingCategory: action.payload,
        product: {},
      };
    case ProductActionTypes.FETCH_TOP_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
        topProducts: {},
      };
    case ProductActionTypes.FETCH_ONE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
        productId: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      const products = action.payload;
      products.fetchingCategory = state.fetchingCategory;
      return {
        ...state,
        isFetching: false,
        fetchingCategory: undefined,
        products,
      };
    case ProductActionTypes.FETCH_TOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topProducts: action.payload,
      };
    case ProductActionTypes.FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isFetching: false,
        productId: undefined,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
    case ProductActionTypes.FETCH_ONE_PRODUCT_FAILURE:
    case ProductActionTypes.FETCH_TOP_PRODUCTS_FAILURE:
      return {
        isFetching: false,
        fetchingCategory: undefined,
        error: action.payload,
        productId: undefined,
      };
    default:
      return state;
  }
};

export default productReducer;
