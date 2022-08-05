import React, { useEffect, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCategoriesStart } from "../../redux/category/category.actions";
import { fetchProductsStart } from "../../redux/products/product.actions";

import Spinner from "../../components/spinner/spinner.component";
import { ProductsPageContainer } from "./products-page.styles";

const CategoriesList = lazy(() =>
  import("../../components/categories-list/categories-list.component")
);

const ProductsList = lazy(() =>
  import("../../components/products-list/products-list.container")
);

const ProductsPage = ({ fetchCategoriesStart, fetchProductsStart }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const params = useParams();

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
        {!isMobile && <CategoriesList />}
        <ProductsList category={category} />
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
