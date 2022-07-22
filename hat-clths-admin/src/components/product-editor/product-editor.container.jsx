import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductFetching } from "../../redux/products/product.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import ProductEditor from "./product-editor.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsProductFetching(state),
});

const ProductEditorContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductEditor);

export default ProductEditorContainer;
