import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import { fetchProductsStart } from "../../redux/products/product.actions";
import Spinner from "../../components/spinner/spinner.component";
import { ProductsPageContainer } from "./products-page.styles";

const CategoriesList = lazy(() =>
  import("../../components/categories-list/categories-list.component")
);

const ProductsPage = ({ fetchCategoriesStart, fetchProductsStart }) => {
  useEffect(() => {
    fetchCategoriesStart();
    fetchProductsStart("spodnie-damskie-d");
  }, [fetchCategoriesStart, fetchProductsStart]);
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
  fetchProductsStart: (categoryName) =>
    dispatch(fetchProductsStart(categoryName)),
});

export default connect(null, mapDispatchToProps)(ProductsPage);
