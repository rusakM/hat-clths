import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import formatPrice from "../../utils/formatPrice";

import {
  CheckoutItemContainer,
  ContentContainer,
  QuantityContainer,
  RedText,
} from "./checkout-item.styles";

import { Thumbnail } from "../thumbnails-list/thumbnails-list.styles";
import { SummaryRow } from "../../pages/checkout/checkout.styles";

const CheckoutItem = ({ product, clearItem, addItem, removeItem }) => {
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
          <RedText onClick={() => clearItem(product)}>Usuń</RedText>
        </SummaryRow>
        <SummaryRow>
          <QuantityContainer className="quantity">
            <div onClick={() => removeItem(product)}>&#10094;</div>
            <span>{quantity}</span>
            <div onClick={() => addItem(product)}>&#10095;</div>
          </QuantityContainer>
          <h3>{formatPrice(price)}</h3>
        </SummaryRow>
      </ContentContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
