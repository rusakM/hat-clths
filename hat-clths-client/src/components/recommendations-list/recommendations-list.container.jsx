import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectRecommendationsIsFetching } from "../../redux/recommendations/recommendations.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import RecommendationsList from "./recommendations-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectRecommendationsIsFetching(state),
});

const RecommendationsListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(RecommendationsList);

export default RecommendationsListContainer;
