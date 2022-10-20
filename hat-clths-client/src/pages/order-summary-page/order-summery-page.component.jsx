import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { AppError } from "../../api/api.functions";
import {
  PageContainer,
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
  bookingError,
  booking,
  loadingData,
  fetchAddressStart,
  createBookingStart,
  createBookingFailure,
}) => {
  const redirect = useNavigate();
  const [bookingStatus, setBookingStatus] = useState(false);

  useEffect(() => {
    fetchAddressStart();
  }, [fetchAddressStart]);

  useEffect(() => {
    const tryRedirectToPaymentSession = async (bookingData) => {
      if (bookingStatus && !bookingError && !loadingData) {
        if (!(await redirectToPaymentSession(bookingData))) {
          const { _id, accessToken } = bookingData;
          redirect(`/booking-complete/${_id}?accessToken=${accessToken}`);
        }
      }
    };
    if (booking) {
      tryRedirectToPaymentSession(booking);
    }
  }, [booking, redirect, bookingStatus, bookingError, loadingData]);

  // const [isLoading, setIsLoading] = useState(false);

  const createBooking = () => {
    if (!deliveryAddress) {
      createBookingFailure(
        new AppError(
          "Proszę wybrać adres dostawy z listy, lub zapisać nowy korzystając z formularza powyżej",
          404
        )
      );
    }
    const bookingObj = {
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
      // setIsLoading(true);
      validateBooking(bookingObj);

      createBookingStart(bookingObj);
      setBookingStatus(true);
    } catch (error) {
      // setIsLoading(false);
      createBookingFailure(error);
    }
  };

  return (
    <PageContainer>
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
      {bookingError && bookingError.message && (
        <div className="centered-div">
          <p style={{ color: "#ff0000", textAlign: "center" }}>
            {bookingError.message}
          </p>
        </div>
      )}
      <div className="centered-div" style={{ padding: "1em" }}>
        <CustomButton onClick={createBooking}>Złóż zamówienie</CustomButton>
        {loadingData && <SmallSpinner />}
      </div>
    </PageContainer>
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
  bookingError: selectError,
  booking: selectBooking,
  loadingData: selectIsFetchingData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddressStart: () => dispatch(fetchAddressStart()),
  createBookingStart: (bookingData) =>
    dispatch(createBookingStart(bookingData)),
  createBookingFailure: (error) => dispatch(createBookingFailure(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);
