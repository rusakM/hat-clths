import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectCategory = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategory],
  (categories) => categories.categories
);

export const selectCategoryByName = memoize((categoryName) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.name === categoryName)
  )
);

export const selectCategoryBySlug = memoize((categorySlug) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.slug === categorySlug)
  )
);

export const selectCategoryById = memoize((categoryId) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.id === categoryId)
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

export const selectEditorVisibility = createSelector(
  [selectCategory],
  (categories) => categories.editorVisible
);

export const selectCategoryToEdit = createSelector(
  [selectCategory],
  (categories) => categories.categoryToEdit
);

export const selectCategoryTempData = createSelector(
  [selectCategory],
  (categories) => categories.categoryTempData
);
