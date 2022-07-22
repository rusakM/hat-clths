import React, { useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOneProductStart } from "../../redux/products/product.actions";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import Spinner from "../../components/spinner/spinner.component";
const ProductEditor = lazy(() =>
  import("../../components/product-editor/product-editor.container")
);

const ProductPage = ({ fetchCategoriesStart, fetchOneProductStart }) => {
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    if (productId) {
      fetchOneProductStart(productId);
    }
    fetchCategoriesStart();
  }, [fetchCategoriesStart, fetchOneProductStart, productId]);

  return (
    <Suspense fallback={<Spinner />}>
      <ProductEditor />
    </Suspense>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneProductStart: (productId) =>
    dispatch(fetchOneProductStart(productId)),
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

export default connect(null, mapDispatchToProps)(ProductPage);
