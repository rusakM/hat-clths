import React from "react";
import { Link } from "react-router-dom";

import formatPrice from "../../utils/formatPrice";

import {
  CheckoutItemContainer,
  ContentContainer,
} from "../checkout-item/checkout-item.styles";

import { Thumbnail } from "../thumbnails-list/thumbnails-list.styles";
import { SummaryRow } from "../../pages/checkout/checkout.styles";

const OrderItem = ({ product }) => {
  const {
    name,
    imageCover,
    price,
    quantity,
    productPreview,
    category: { slug },
  } = product;
  return (
    <CheckoutItemContainer>
      <Thumbnail
        style={{
          backgroundImage: `url("/uploads/products/${imageCover}")`,
        }}
      />
      <ContentContainer>
        <SummaryRow>
          <h4>
            <Link to={`/products/${slug}/${productPreview}`}>{name}</Link>
          </h4>
        </SummaryRow>
        <SummaryRow>
          <span>Ilość sztuk: {quantity}</span>
          <h3>{formatPrice(price)}</h3>
        </SummaryRow>
      </ContentContainer>
    </CheckoutItemContainer>
  );
};

export default OrderItem;
