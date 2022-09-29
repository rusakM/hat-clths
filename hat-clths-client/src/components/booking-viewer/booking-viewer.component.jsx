import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";

import BookingItem from "../booking-item/booking-item.component";
import BookingHistoryItem from "../booking-history-item/booking-history-item.component";

import {
  selectBooking,
  selectError,
} from "../../redux/booking/booking.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setError } from "../../redux/error/error.actions";

import { formatFullDate } from "../../utils/formatDate";
import formatPrice from "../../utils/formatPrice";

import {
  Container,
  AddressViewer,
  DeliveryContainer,
} from "./booking-viewer.styles";
import { List } from "../bookings-list/bookings-list.styles";
import { ItemContainer } from "../booking-item/booking-item.styles";

const BookingViewer = ({ booking, bookingError, isFromAccountComponent }) => {
  if (bookingError) {
    return <Navigate to="/error" replace={false} />;
  }
  const {
    products,
    deliveryType,
    deliveryCost,
    user,
    address,
    invoice,
    history,
  } = booking;

  return (
    <Container>
      {!isFromAccountComponent && (
        <div>
          <Link to="/">
            <h4>
              <FontAwesomeIcon icon={faChevronLeft} />
              &nbsp; Powrót do strony głównej
            </h4>
          </Link>
        </div>
      )}
      <h2>
        Zamówienie numer: {`#${booking.barcode ? booking.barcode : booking.id}`}
      </h2>
      <p>Data złożenia zamówienia: {formatFullDate(booking.createdAt)}</p>
      <List>
        {products &&
          products.length > 0 &&
          products.map((product, index) => (
            <BookingItem item={product} key={index} />
          ))}
        <ItemContainer>
          <h4>Rodzaj dostawy: {deliveryType}</h4>
          <h4>{formatPrice(deliveryCost)}</h4>
          {!booking.paymentMethod && (
            <p>Płatność za pobraniem +{formatPrice(5)}</p>
          )}
        </ItemContainer>
        <ItemContainer>
          <h4>Razem:</h4>
          <h4>{formatPrice(booking.total)}</h4>
        </ItemContainer>
      </List>
      <Container>
        <h3>Adres dostawy:</h3>
        <AddressViewer>
          <div style={{ padding: "0 1em" }}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <DeliveryContainer>
            <div>
              <p>
                {address.street} {address.houseNumber}
                {address.flatNumber && ` m. ${address.flatNumber}`}
              </p>
              <p>
                {address.zipCode} {address.city}
              </p>
              <p>{address.phoneNumber}</p>
            </div>
            {invoice && (
              <div>
                <p>{invoice.company}</p>
                <p>{invoice.nip}</p>
              </div>
            )}
          </DeliveryContainer>
        </AddressViewer>
      </Container>
      <Container>
        <h3>Historia zamówienia:</h3>
        {history && history.length > 0 && (
          <List>
            {history
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item, num) => (
                <BookingHistoryItem item={item} num={num + 1} key={item.id} />
              ))}
          </List>
        )}
      </Container>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  bookingError: selectError,
  booking: selectBooking,
});

const mapDispatchToProps = (dispatch) => ({
  setError: (message, code) => dispatch(setError(message, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingViewer);
