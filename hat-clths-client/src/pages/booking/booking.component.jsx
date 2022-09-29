import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

import { fetchBookingStart } from "../../redux/booking/booking.actions";
import {
  selectBooking,
  selectError,
} from "../../redux/booking/booking.selectors";

const BookingViewer = lazy(() =>
  import("../../components/booking-viewer/booking-viewer.container")
);
const Booking = ({ fetchBooking, booking, bookingError }) => {
  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const accessToken = queryParams.get("accessToken");
  const [renderBooking, setRenderBooking] = useState(false);

  useEffect(() => {
    fetchBooking(id, accessToken);
  }, [fetchBooking, id, accessToken]);

  useEffect(() => {
    if (booking || bookingError) {
      setRenderBooking(true);
    }
  }, [renderBooking, booking, bookingError]);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {renderBooking && <BookingViewer />}
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  booking: selectBooking,
  bookingError: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBooking: (id, accessToken) =>
    dispatch(fetchBookingStart(id, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
