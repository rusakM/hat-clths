import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectBooking,
  selectIsFetchingData,
  selectError,
} from "../../redux/booking/booking.selectors";
import {
  fetchBookingStart,
  payForBookingStart,
} from "../../redux/booking/booking.actions";

import { InfoContainer, Message } from "./booking-complete.styles";

const BookingComplete = ({
  booking,
  isFetching,
  bookingError,
  fetchBooking,
  payForBooking,
}) => {
  const params = useParams();
  const location = useLocation();

  const { accessToken } = params;
  const bookingId = location.pathname.split("/")[2];
  const bookingLink = `/bookings/${bookingId}${
    accessToken ? `?accessToken=${accessToken}` : ""
  }`;

  useEffect(() => {
    fetchBooking(bookingId, accessToken);
  }, [fetchBooking, bookingId, accessToken]);

  useEffect(() => {
    if (booking) {
      const { paymentMethod, paid } = booking;
      if (paymentMethod && !paid) {
        payForBooking(bookingId, accessToken);
      }
    }
  }, [payForBooking, booking, bookingId, accessToken]);

  const paid = booking ? booking.paid : false;

  return (
    <div className="centered-div">
      {isFetching ? (
        <Spinner description="Przetwarzanie zamówienia. Nie zamykaj okna przeglądarki!" />
      ) : bookingError && !paid ? (
        <Message red={true}>{bookingError.message}</Message>
      ) : (
        <InfoContainer>
          <Message>Zamówienie przyjęte!</Message>
          <Link to={bookingLink}>
            <CustomButton>Przejdź do zamówienia</CustomButton>
          </Link>
        </InfoContainer>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  booking: selectBooking,
  isFetching: selectIsFetchingData,
  bookingError: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBooking: (id, accessToken) =>
    dispatch(fetchBookingStart(id, accessToken)),
  payForBooking: (id, accessToken) =>
    dispatch(payForBookingStart(id, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingComplete);
