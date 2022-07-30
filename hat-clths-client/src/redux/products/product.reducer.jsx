import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: {},
  isFetching: false,
  error: undefined,
  fetchingCategory: undefined,
  product: {},
  productId: undefined,
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
    case ProductActionTypes.CREATE_PRODUCT_START:
    case ProductActionTypes.UPDATE_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProductActionTypes.FETCH_ONE_PRODUCT_SUCCESS:
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
    case ProductActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isFetching: false,
        productId: undefined,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
    case ProductActionTypes.FETCH_ONE_PRODUCT_FAILURE:
    case ProductActionTypes.CREATE_PRODUCT_FAILURE:
    case ProductActionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        isFetching: false,
        fetchingCategory: undefined,
        error: action.payload,
        productId: undefined,
      };
    case ProductActionTypes.CLEAR_PRODUCT_DATA:
      return {
        ...state,
        product: {},
      };
    default:
      return state;
  }
};

export default productReducer;
