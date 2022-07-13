import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import Spinner from "../../components/spinner/spinner.component";
import { ProductsPageContainer } from "./products-page.styles";

const CategoriesList = lazy(() =>
  import("../../components/categories-list/categories-list.component")
);

const ProductsPage = ({ fetchCategoriesStart }) => {
  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);
  return (
    <ProductsPageContainer>
      <Suspense fallback={<Spinner />}>
        <CategoriesList />
      </Suspense>
    </ProductsPageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

export default connect(null, mapDispatchToProps)(ProductsPage);
