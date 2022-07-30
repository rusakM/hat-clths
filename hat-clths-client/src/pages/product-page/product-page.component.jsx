import React, { useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOneProductStart } from "../../redux/products/product.actions";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import Spinner from "../../components/spinner/spinner.component";

const ProductPage = ({ fetchCategoriesStart, fetchOneProductStart }) => {
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    if (productId) {
      fetchOneProductStart(productId);
    }
    fetchCategoriesStart();
  }, [fetchCategoriesStart, fetchOneProductStart, productId]);

  return <Suspense fallback={<Spinner />}></Suspense>;
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneProductStart: (productId) =>
    dispatch(fetchOneProductStart(productId)),
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

export default connect(null, mapDispatchToProps)(ProductPage);
