import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectGenderBasedRecommendations } from "../../redux/recommendations/recommendations.selectors";

import ListComponent from "./list.component";

const GenderBasedRecommendationsList = ({
  products,
  size,
  mobileSize,
  length,
}) => (
  <ListComponent
    products={products}
    size={size}
    mobileSize={mobileSize}
    length={length}
  />
);

const mapStateToProps = createStructuredSelector({
  products: selectGenderBasedRecommendations,
});

export default connect(mapStateToProps)(GenderBasedRecommendationsList);
