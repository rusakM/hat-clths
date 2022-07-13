import { createSelector } from "reselect";
import memoize from "lodash.memoize";
import { categorySagas } from "./category.sagas";

const selectCategory = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategory],
  (categories) => categories.categories
);

export const selectCategoryByName = memoize((collectionName) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.name === collectionName)
  )
);

export const selectCategoryById = memoize((collectionId) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.id === collectionId)
  )
);

export const selectIsCategoriesFetching = createSelector(
  [selectCategory],
  (categories) => categories.isFetching
);

export const selectCategoriesError = createSelector(
  [selectCategory],
  (categories) => categories.error
);

export const selectIsCategoriesLoaded = createSelector(
  [selectCategory],
  (categories) => !!categories.categories
);
