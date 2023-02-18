import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectGenderBasedRecommendationsIsFetching } from "../../redux/recommendations/recommendations.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import GenderBasedRecommendationsList from "./gender-based-recommendations-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectGenderBasedRecommendationsIsFetching(state),
});

const GenderBasedRecommendationsListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(GenderBasedRecommendationsList);

export default GenderBasedRecommendationsListContainer;
