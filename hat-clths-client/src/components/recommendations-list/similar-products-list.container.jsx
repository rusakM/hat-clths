import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectSimilarProductsIsFetching } from "../../redux/recommendations/recommendations.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import SimilarProductsList from "./similar-products-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectSimilarProductsIsFetching(state),
});

const SimilarProductsListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(SimilarProductsList);

export default SimilarProductsListContainer;
