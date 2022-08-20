import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";

import {
  CheckoutSummary,
  SummaryRow,
  Line,
} from "../../pages/checkout/checkout.styles";

import {
  selectCartTotal,
  selectDeliveryType,
  selectPaymentMethod,
} from "../../redux/cart/cart.selectors";
import { paymentWithDelivery } from "../../utils/deliveryTypes";
import formatPrice from "../../utils/formatPrice";

const OrderSummary = ({ total, deliveryType, paymentMethod }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const discount = 0;
  const deliveryCost =
    deliveryType.price + (paymentMethod ? 0 : paymentWithDelivery);
  return (
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
      <SummaryRow>
        <h4>Rodzaj dostawy: </h4>
        <h4>{deliveryType.name}</h4>
      </SummaryRow>
      <SummaryRow>
        <h4>Płatność za pobraniem:</h4>
        <h4>{paymentWithDelivery ? "NIE" : "TAK"}</h4>
      </SummaryRow>
      {isMobile && <Line />}
    </CheckoutSummary>
  );
};

const mapStateToProps = createStructuredSelector({
  total: selectCartTotal,
  deliveryType: selectDeliveryType,
  paymentMethod: selectPaymentMethod,
});

export default connect(mapStateToProps)(OrderSummary);
