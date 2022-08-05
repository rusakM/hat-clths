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

export const fetchTopProductsStart = () => ({
  type: ProductActionTypes.FETCH_TOP_PRODUCTS_START,
  payload: { limit: 10 },
});

export const fetchTopProductsSuccess = (productsMap) => ({
  type: ProductActionTypes.FETCH_TOP_PRODUCTS_SUCCESS,
  payload: productsMap,
});

export const fetchTopProductsFailure = (error) => ({
  type: ProductActionTypes.FETCH_TOP_PRODUCTS_FAILURE,
  payload: error,
});

export const sendReviewStart = (reviewData, productId) => ({
  type: ProductActionTypes.SEND_REVIEW_START,
  payload: { reviewData, productId },
});

export const sendReviewSuccess = (reviews) => ({
  type: ProductActionTypes.SEND_REVIEW_SUCCESS,
  payload: reviews,
});

export const sendReviewFailure = (error) => ({
  type: ProductActionTypes.SEND_REVIEW_FAILURE,
  payload: error,
});
