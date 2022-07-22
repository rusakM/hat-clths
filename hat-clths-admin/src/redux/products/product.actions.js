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

export const fetchOneProductStart = (productId) => ({
  type: ProductActionTypes.FETCH_ONE_PRODUCT_START,
  payload: productId,
});

export const fetchOneProductSuccess = (product) => ({
  type: ProductActionTypes.FETCH_ONE_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchOneProductFailure = (error) => ({
  type: ProductActionTypes.FETCH_ONE_PRODUCT_FAILURE,
  payload: error,
});

export const clearProductData = () => ({
  type: ProductActionTypes.CLEAR_PRODUCT_DATA,
});
