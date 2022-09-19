import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import OrderList from "../../components/order-list/order-list.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import Address from "../../components/address/address.component";
import Invoice from "../../components/invoice/invoice.component";
import SmallSpinner from "../../components/small-spinner/small-spinner.component";

import { validateBooking } from "./order.validator";
import { redirectToPaymentSession } from "../../api/booking.functions";

import { fetchAddressStart } from "../../redux/address/address.actions";
import {
  createBookingStart,
  createBookingFailure,
} from "../../redux/booking/booking.actions";

import {
  selectBooking,
  selectIsFetchingData,
  selectError,
} from "../../redux/booking/booking.selectors";
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
  bookingIsLoading,
  bookingError,
  booking,
  fetchAddressStart,
  createBookingStart,
  createBookingFailure,
}) => {
  useEffect(() => {
    fetchAddressStart();
  }, [fetchAddressStart]);

  useEffect(() => {
    const tryRedirectToPaymentSession = async (bookingData) => {
      if (!(await redirectToPaymentSession(bookingData))) {
        console.log("płatność za pobraniem");
      }
    };
    if (booking) {
      tryRedirectToPaymentSession(booking);
    }
  }, [booking]);

  const [isLoading, setIsLoading] = useState(false);

  const createBooking = () => {
    const booking = {
      address: deliveryAddress,
      products: cartItems,
      user: deliveryAddress.user,
      booking: {
        deliveryType,
        paymentInAdvance: paymentMethod,
      },
      invoice,
      invoiceAddress,
      isWithInvoice,
    };

    try {
      setIsLoading(true);
      validateBooking(booking);

      createBookingStart(booking);
    } catch (error) {
      setIsLoading(false);
      createBookingFailure(error);
    }
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
        {isLoading && <SmallSpinner />}
      </div>
      {bookingError && bookingError.message && (
        <div className="centered-div">
          <p>{bookingError.message}</p>
        </div>
      )}
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
  bookingIsLoading: selectIsFetchingData,
  bookingError: selectError,
  booking: selectBooking,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddressStart: () => dispatch(fetchAddressStart()),
  createBookingStart: (bookingData) =>
    dispatch(createBookingStart(bookingData)),
  createBookingFailure: (error) => dispatch(createBookingFailure(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);
