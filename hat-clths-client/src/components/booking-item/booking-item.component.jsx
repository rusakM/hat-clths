import React from "react";
import { Link } from "react-router-dom";

import formatPrice from "../../utils/formatPrice";

import { Thumbnail } from "../thumbnails-list/thumbnails-list.styles";
import {
  ItemContainer,
  ContentContainer,
  PriceContainer,
} from "./booking-item.styles";

const BookingItem = ({
  item: { product, category, productPreview, quantity, price },
}) => (
  <ItemContainer>
    <Thumbnail
      style={{
        backgroundImage: `url("/uploads/products/${productPreview.imageCover}")`,
      }}
    />
    <ContentContainer>
      <Link to={`/products/${category.slug}/${productPreview.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <PriceContainer>
        <p>
          {quantity} x {formatPrice(price)}
        </p>
        <h3>{formatPrice(price * quantity)}</h3>
      </PriceContainer>
    </ContentContainer>
  </ItemContainer>
);

export default BookingItem;
