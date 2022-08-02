import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectProduct = (state) => state.products;
const defaultList = [];
const defaultObject = {};

export const selectProducts = createSelector([selectProduct], (products) =>
  products.products ? products.products : defaultList
);

export const selectProductsByCategory = memoize((categoryName) =>
  createSelector([selectProducts], (products) =>
    products ? products[categoryName] : defaultList
  )
);

export const selectIsProductFetching = createSelector(
  [selectProduct],
  (products) => products.isFetching
);

export const selectProductsError = createSelector(
  [selectProduct],
  (products) => products.error
);

export const selectOneProduct = createSelector([selectProduct], (products) =>
  products ? products.product : defaultObject
);

export const selectTopProducts = createSelector([selectProduct], (products) =>
  products ? products.topProducts : defaultList
);
