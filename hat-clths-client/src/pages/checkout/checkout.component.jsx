import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import Tile from "../../components/tile/tile.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import formatPrice from "../../utils/formatPrice";
import DELIVERY_TYPES from "../../utils/deliveryTypes";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutPageList,
  CheckoutSummary,
  Line,
  SummaryRow,
} from "./checkout.styles";

import "../main-page/main-page.styles.css";

const CheckoutPage = ({ cartItems, total }) => {
  const [discount, setDiscount] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(
    DELIVERY_TYPES.COURIER.price
  );
  const [deliverySelected, setDelivery] = useState(0);
  const [isPaymentInAdvance, setPaymentInAdvance] = useState(true);
  const [coupon, setCoupon] = useState("");

  const selectDeliveryType = (type, price) => {
    const additionalCost = isPaymentInAdvance ? 0 : 5;
    setDelivery(type);
    setDeliveryCost(price + additionalCost);
  };

  const togglePaymentInAdvance = (event) => {
    const { checked } = event.target;
    const additionalCost = !checked ? -5 : 5;
    setDeliveryCost(deliveryCost + additionalCost);
    setPaymentInAdvance(!checked);
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  return (
    <CheckoutPageContainer>
      <CheckoutPageList>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} product={cartItem} />
        ))}
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
                onClick={() => selectDeliveryType(index, type.price)}
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
              value={!isPaymentInAdvance}
              onChange={togglePaymentInAdvance}
            />
            <label htmlFor="paymentInAdvance" style={{ padding: "5px" }}>
              Płatność przy odbiorze: +{formatPrice(5)}
            </label>
          </div>
        </SummaryRow>
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
        <CustomButton>Przejdź do podsumowania</CustomButton>
      </CheckoutSummary>
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
