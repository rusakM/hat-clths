import React, { useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import { fetchProductsStart } from "../../redux/products/product.actions";
import { selectEditorVisibility } from "../../redux/category/category.selectors";

import Spinner from "../../components/spinner/spinner.component";
import { ProductsPageContainer } from "./products-page.styles";

const CategoriesList = lazy(() =>
  import("../../components/categories-list/categories-list.component")
);

const ProductsList = lazy(() =>
  import("../../components/products-list/products-list.container")
);

const Popup = lazy(() => import("../../components/popup/popup.component"));
const CategoryEditor = lazy(() =>
  import("../../components/category-editor/category-editor.component")
);

const ProductsPage = ({
  editorVisible,
  fetchCategoriesStart,
  fetchProductsStart,
}) => {
  const params = useParams();
  console.log(params);

  let category = "new";
  if (params.id) {
    category = params.id;
  }

  useEffect(() => {
    fetchCategoriesStart();
    fetchProductsStart(category);
  }, [fetchCategoriesStart, fetchProductsStart, category]);
  return (
    <ProductsPageContainer>
      <Suspense fallback={<Spinner />}>
        <CategoriesList />
        <ProductsList category={category} />
        {editorVisible && (
          <Popup>
            <CategoryEditor category={category} />
          </Popup>
        )}
      </Suspense>
    </ProductsPageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
  fetchProductsStart: (categoryName) =>
    dispatch(fetchProductsStart(categoryName)),
});

const mapStateToProps = createStructuredSelector({
  editorVisible: selectEditorVisibility,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
