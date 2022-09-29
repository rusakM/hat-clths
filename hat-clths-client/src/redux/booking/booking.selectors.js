import { createSelector } from "reselect";

const selectBookingData = (state) => state.booking;

export const selectBooking = createSelector(
  [selectBookingData],
  (booking) => booking.booking
);

export const selectIsFetchingData = createSelector(
  [selectBookingData],
  (booking) => booking.isFetching
);

export const selectError = createSelector(
  [selectBookingData],
  (booking) => booking.error
);

export const selectBookingList = createSelector(
  [selectBookingData],
  (booking) => booking.bookingsList
);
