import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSimilarProducts } from "../../redux/recommendations/recommendations.selectors";

import ListComponent from "./list.component";

const SimilarProductsList = ({ products, size, mobileSize, length }) => (
  <ListComponent
    products={products}
    size={size}
    mobileSize={mobileSize}
    length={length}
  />
);

const mapStateToProps = createStructuredSelector({
  products: selectSimilarProducts,
});

export default connect(mapStateToProps)(SimilarProductsList);
