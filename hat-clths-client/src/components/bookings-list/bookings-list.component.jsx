import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import BookingsListItem from "../bookings-list-item/bookings-list-item.component";

import { selectBookingList } from "../../redux/booking/booking.selectors";

import { Container, List } from "./bookings-list.styles";

const BookingList = ({ bookingList }) => {
  return (
    <Container>
      <List>
        <h2>Moje zamówienia:</h2>
        {(!bookingList || bookingList.length === 0) && (
          <p>Lista zamówień jest pusta</p>
        )}
        {bookingList &&
          bookingList.length > 0 &&
          bookingList.map((item, index) => (
            <BookingsListItem
              bookingData={item}
              key={item.id}
              border={index > 0}
            />
          ))}
      </List>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  bookingList: selectBookingList,
});

export default connect(mapStateToProps)(BookingList);
