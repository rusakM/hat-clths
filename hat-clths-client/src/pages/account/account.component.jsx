import React, { Suspense, lazy } from "react";
import { useMatch, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Spinner from "../../components/spinner/spinner.component";
import AccountListComponent from "../../components/account-list/account-list.component";
import AccountViewer from "../../components/account-viewer/account-viewer.component";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  fetchBookingListStart,
  fetchBookingStart,
} from "../../redux/booking/booking.actions";
import { fetchAddressStart } from "../../redux/address/address.actions";

import { Container } from "./account.styles";

const BookingList = lazy(() =>
  import("../../components/bookings-list/bookings-list.container")
);

const AddressList = lazy(() =>
  import("../../components/address-list/address-list.container")
);

const BookingViewer = lazy(() =>
  import("../../components/booking-viewer/booking-viewer.container")
);

const Account = ({
  currentUser,
  fetchBookings,
  fetchAddress,
  fetchBooking,
}) => {
  const accountMatch = useMatch("/account");
  const bookingsMatch = useMatch("/account/bookings");
  const bookingMatch = useMatch("/account/bookings/:id");
  const addressMatch = useMatch("/account/address");
  const matchTest =
    !!accountMatch || !!bookingsMatch || !!bookingMatch || !!addressMatch;
  console.log(bookingMatch);
  let Content;
  if (!matchTest) {
    Content = <Navigate to="/account" replace={true} />;
  }
  if (bookingsMatch) {
    fetchBookings();
    Content = <BookingList />;
  } else if (bookingMatch) {
    fetchBooking(bookingMatch.params.id);
    Content = <BookingViewer isFromAccountComponent={true} />;
  } else if (addressMatch) {
    fetchAddress();
    Content = <AddressList />;
  } else {
    Content = <AccountViewer />;
  }

  return (
    <Container>
      <AccountListComponent />
      <Suspense fallback={<Spinner />}>{Content}</Suspense>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBookings: () => dispatch(fetchBookingListStart()),
  fetchAddress: () => dispatch(fetchAddressStart()),
  fetchBooking: (bookingId) => dispatch(fetchBookingStart(bookingId, null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
