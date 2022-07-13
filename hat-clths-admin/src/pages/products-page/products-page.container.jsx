import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCategoriesLoaded } from "../../redux/category/category.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductsPage from "./products-page.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCategoriesLoaded(state),
});

const ProductsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductsPage);

export default ProductsPageContainer;
