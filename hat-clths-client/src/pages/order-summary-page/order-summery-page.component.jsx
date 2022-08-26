import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import OrderList from "../../components/order-list/order-list.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import Address from "../../components/address/address.component";
import Invoice from "../../components/invoice/invoice.component";

import { validateBooking } from "./order.validator";

import { fetchAddressStart } from "../../redux/address/address.actions";
import {
  selectCartItems,
  selectCartTotal,
  selectDeliveryType,
  selectPaymentMethod,
} from "../../redux/cart/cart.selectors";

import {
  selectCurrentAddress,
  selectCurrentInvoice,
  selectAddressForInvoice,
  selectIsWithInvoice,
} from "../../redux/address/address.selectors";
import {
  PageConstainer,
  ContainersRow,
  BackBtn,
} from "./order-summary-page.styles";
import CustomButton from "../../components/custom-button/custom-button.component";

const OrderSummaryPage = ({
  cartItems,
  deliveryType,
  paymentMethod,
  deliveryAddress,
  invoice,
  invoiceAddress,
  isWithInvoice,
  fetchAddressStart,
}) => {
  useEffect(() => {
    fetchAddressStart();
  }, [fetchAddressStart]);

  const createBooking = () => {
    const booking = {
      products: cartItems,
      deliveryType,
      paymentInAdvance: paymentMethod,
      address: deliveryAddress,
      invoice,
      invoiceAddress,
      isWithInvoice,
    };

    validateBooking(booking);

    console.log(booking);
  };

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
      <ContainersRow>
        <Address />
        <Invoice />
      </ContainersRow>
      <div className="centered-div" style={{ padding: "1em" }}>
        <CustomButton onClick={createBooking}>Złóż zamówienie</CustomButton>
      </div>
    </PageConstainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  deliveryType: selectDeliveryType,
  paymentMethod: selectPaymentMethod,
  deliveryAddress: selectCurrentAddress,
  invoice: selectCurrentInvoice,
  invoiceAddress: selectAddressForInvoice,
  isWithInvoice: selectIsWithInvoice,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddressStart: () => dispatch(fetchAddressStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);
