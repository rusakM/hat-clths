import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductFetching } from "../../redux/products/product.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import TopProductsList from "./top-products-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsProductFetching(state),
});

const ProductsListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(TopProductsList);

export default ProductsListContainer;
