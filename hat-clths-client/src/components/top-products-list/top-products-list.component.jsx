import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Tile from "../tile/tile.component";

import { selectTopProducts } from "../../redux/products/product.selectors";
import formatPrice from "../../utils/formatPrice";

import { TopProductsListContainer, List } from "./top-products-list.styles";

const TopProductsList = ({ products }) => (
  <TopProductsListContainer>
    <List>
      {products &&
        products.length > 0 &&
        products.map(({ _id, name, price, imageCover, category: { slug } }) => (
          <Tile
            width={25}
            height={30}
            unit="vw"
            link={`/products/${slug}/${_id}`}
            descriptionRows={[name, formatPrice(price)]}
            key={_id}
          >
            <div
              style={{
                backgroundImage: `url('/uploads/products/${imageCover}')`,
              }}
            ></div>
          </Tile>
        ))}
    </List>
  </TopProductsListContainer>
);

const mapStateToProps = createStructuredSelector({
  products: selectTopProducts,
});

export default connect(mapStateToProps)(TopProductsList);
