import React, { useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOneProductStart } from "../../redux/products/product.actions";
import Spinner from "../../components/spinner/spinner.component";
import ProductViewerContainer from "../../components/product-viewer/product-viewer.container";

const ProductPage = ({ fetchOneProductStart, fetchReviewsStart }) => {
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    if (productId) {
      fetchOneProductStart(productId);
    }
  }, [fetchOneProductStart, productId]);

  return (
    <Suspense fallback={<Spinner />}>
      <ProductViewerContainer />
    </Suspense>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneProductStart: (productId) =>
    dispatch(fetchOneProductStart(productId)),
});

export default connect(null, mapDispatchToProps)(ProductPage);
