import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectProduct = (state) => state.products;

export const selectProducts = createSelector([selectProduct], (products) =>
  products.products ? products.products : []
);

export const selectProductsByCategory = memoize((categoryName) =>
  createSelector([selectProducts], (products) =>
    products ? products[categoryName] : []
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
  products ? products.product : {}
);
