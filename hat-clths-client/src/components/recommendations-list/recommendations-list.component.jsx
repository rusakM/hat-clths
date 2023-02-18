import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectRecommendedProducts } from "../../redux/recommendations/recommendations.selectors";

import ListComponent from "./list.component";

const RecommendationsList = ({ products, size, mobileSize, length }) => (
  <ListComponent
    products={products}
    size={size}
    mobileSize={mobileSize}
    length={length}
  />
);

const mapStateToProps = createStructuredSelector({
  products: selectRecommendedProducts,
});

export default connect(mapStateToProps)(RecommendationsList);
