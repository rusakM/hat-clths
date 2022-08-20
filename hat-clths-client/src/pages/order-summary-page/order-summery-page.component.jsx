import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import OrderList from "../../components/order-list/order-list.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { fetchAddressStart } from "../../redux/address/address.actions";
import {
  selectCartItems,
  selectCartTotal,
  selectDeliveryType,
  selectPaymentMethod,
} from "../../redux/cart/cart.selectors";
import {
  PageConstainer,
  ContainersRow,
  BackBtn,
} from "./order-summary-page.styles";

const OrderSummaryPage = ({
  cartItems,
  total,
  deliveryType,
  paymentMethod,
  fetchAddressStart,
}) => {
  useEffect(() => {
    fetchAddressStart();
  }, [fetchAddressStart]);

  return (
    <PageConstainer>
      <BackBtn to="/cart">
        <FontAwesomeIcon icon={faChevronLeft} />
        &nbsp;Powrót do koszyka
      </BackBtn>
      <ContainersRow>
        <OrderList productsList={cartItems} />
        <OrderSummary />
      </ContainersRow>
    </PageConstainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  deliveryType: selectDeliveryType,
  paymentMethod: selectPaymentMethod,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddressStart: () => dispatch(fetchAddressStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);
