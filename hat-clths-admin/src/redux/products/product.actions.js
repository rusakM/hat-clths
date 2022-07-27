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

export const createProductStart = (productData, id) => ({
  type: ProductActionTypes.CREATE_PRODUCT_START,
  payload: productData,
});

export const createProductSuccess = (productData) => ({
  type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
  payload: productData,
});

export const createProductFailure = (error) => ({
  type: ProductActionTypes.CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductStart = (productData, id) => ({
  type: ProductActionTypes.UPDATE_PRODUCT_START,
  payload: { form: productData, id },
});

export const updateProductSuccess = (productData) => ({
  type: ProductActionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: productData,
});

export const updateProductFailure = (error) => ({
  type: ProductActionTypes.UPDATE_PRODUCT_FAILURE,
  payload: error,
});
