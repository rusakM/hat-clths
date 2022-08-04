import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductFetching } from "../../redux/products/product.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import ProductViewer from "./product-viewer.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsProductFetching(state),
});

const ProductViewerContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductViewer);

export default ProductViewerContainer;
