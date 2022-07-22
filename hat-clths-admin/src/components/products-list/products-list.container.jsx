import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductFetching } from "../../redux/products/product.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductsList from "./products-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsProductFetching(state),
});

const ProductsListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductsList);

export default ProductsListContainer;
