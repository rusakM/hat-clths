import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import Tile from "../../components/tile/tile.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import formatPrice from "../../utils/formatPrice";
import DELIVERY_TYPES, { paymentWithDelivery } from "../../utils/deliveryTypes";

import {
  selectCartItems,
  selectCartTotal,
  selectDeliveryType,
  selectPaymentMethod,
} from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import {
  setPaymentMethod,
  setDeliveryType,
} from "../../redux/cart/cart.actions";

import {
  CheckoutPageContainer,
  CheckoutPageList,
  CheckoutSummary,
  Line,
  SummaryRow,
} from "./checkout.styles";

const CheckoutPage = ({
  cartItems,
  total,
  paymentMethod,
  deliveryType,
  setDeliveryType,
  setPaymentMethod,
  currentUser,
}) => {
  const discount = 0;
  const deliveryCost =
    deliveryType.price + (paymentMethod ? 0 : paymentWithDelivery);
  const [deliverySelected, setDelivery] = useState(0);
  const [coupon, setCoupon] = useState("");

  const selectDeliveryType = (type, index) => {
    setDelivery(index);
    setDeliveryType(type);
  };

  const togglePaymentInAdvance = (event) => {
    const { checked } = event.target;
    setPaymentMethod(!checked);
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  return (
    <CheckoutPageContainer>
      <CheckoutPageList>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} product={cartItem} />
          ))
        ) : (
          <h3>Twój koszyk jest pusty</h3>
        )}
      </CheckoutPageList>
      <CheckoutSummary>
        <SummaryRow>
          <h4>Cena produktów:</h4>
          <h4>{formatPrice(total)}</h4>
        </SummaryRow>
        <SummaryRow>
          <h4>Koszt dostawy: </h4>
          <h4>{formatPrice(deliveryCost)}</h4>
        </SummaryRow>
        <SummaryRow>
          <h4>Rabat:</h4>
          <h4>{formatPrice(discount)}</h4>
        </SummaryRow>
        <Line />
        <SummaryRow>
          <h3>Łączna kwota:</h3>
          <h3>{formatPrice(total + deliveryCost - discount)}</h3>
        </SummaryRow>
        <Line />
        <h3>Rodzaj dostawy:</h3>
        <SummaryRow style={{ justifyContent: "center" }}>
          {Object.values(DELIVERY_TYPES).map((type, index) => (
            <Tile
              width="80"
              height="80"
              unit="px"
              descriptionRows={[type.name, type.price]}
              additionalClass={
                index === deliverySelected ? "tile-selected" : ""
              }
              key={index}
            >
              <div
                onClick={() => selectDeliveryType(type, index)}
                style={{
                  backgroundImage: `url("/uploads/delivery/${type.photo}")`,
                  padding: "30px",
                  width: "auto",
                  height: "auto",
                }}
              ></div>
            </Tile>
          ))}
        </SummaryRow>
        <SummaryRow>
          <div>
            <input
              type="checkbox"
              name="paymentInAdvance"
              id="paymentInAdvance"
              value={!paymentMethod}
              checked={!paymentMethod}
              onChange={togglePaymentInAdvance}
            />
            <label htmlFor="paymentInAdvance" style={{ padding: "5px" }}>
              Płatność przy odbiorze: +{formatPrice(paymentWithDelivery)}
            </label>
          </div>
        </SummaryRow>
        {currentUser && (
          <SummaryRow style={{ paddingTop: "0.5em", alignItems: "center" }}>
            <FormInput
              label="kod rabatowy"
              value={coupon}
              onChange={handleCouponChange}
              style={{
                width: "100%",
                padding: "0 1em",
              }}
              wide
            />
            <CustomButton className="small-button">Zastosuj</CustomButton>
          </SummaryRow>
        )}
        <Link to="/order-summary">
          <CustomButton>Przejdź do podsumowania</CustomButton>
        </Link>
      </CheckoutSummary>
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  paymentMethod: selectPaymentMethod,
  deliveryType: selectDeliveryType,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setDeliveryType: (deliveryType) => dispatch(setDeliveryType(deliveryType)),
  setPaymentMethod: (paymentMethod) =>
    dispatch(setPaymentMethod(paymentMethod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
