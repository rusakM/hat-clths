import bookingTypes from "./booking.types";

export const createBookingStart = (bookingData) => ({
  type: bookingTypes.CREATE_BOOKING_START,
  payload: bookingData,
});

export const createBookingSuccess = (bookingData) => ({
  type: bookingTypes.CREATE_BOOKING_SUCCESS,
  payload: bookingData,
});

export const createBookingFailure = (error) => ({
  type: bookingTypes.CREATE_BOOKING_FAILURE,
  payload: error,
});

export const fetchBookingStart = (bookingId) => ({
  type: bookingTypes.FETCH_BOOKING_START,
  payload: bookingId,
});

export const fetchBookingSuccess = (bookingData) => ({
  type: bookingTypes.FETCH_BOOKING_SUCCESS,
  payload: bookingData,
});

export const fetchBookingFailure = (error) => ({
  type: bookingTypes.FETCH_BOOKING_FAILURE,
  payload: error,
});
