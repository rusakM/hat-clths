import ProductActionTypes from "./product.types";

export const fetchProductsStart = (categoryName) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START,
  payload: categoryName,
});

export const fetchProductsSuccess = (productsMap) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: productsMap,
});

export const fetchProductsFailure = (error) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});
