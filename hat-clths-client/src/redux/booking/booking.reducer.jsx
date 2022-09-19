import bookingTypes from "./booking.types";

const INITIAL_STATE = {
  booking: null,
  isFetching: false,
  error: null,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bookingTypes.FETCH_BOOKING_START:
    case bookingTypes.CREATE_BOOKING_START:
    case bookingTypes.PAY_FOR_BOOKING_START:
      return {
        ...state,
        isFetchng: true,
      };
    case bookingTypes.CREATE_BOOKING_SUCCESS:
    case bookingTypes.FETCH_BOOKING_SUCCESS:
      return {
        ...state,
        isFetchng: false,
        booking: action.payload,
      };
    case bookingTypes.PAY_FOR_BOOKING_SUCCESS:
      return {
        ...state,
        isFetchng: false,
      };
    case bookingTypes.CREATE_BOOKING_FAILURE:
    case bookingTypes.FETCH_BOOKING_FAILURE:
    case bookingTypes.PAY_FOR_BOOKING_FAILURE:
      return {
        ...state,
        isFetchng: false,
        bookingCreatedStatus: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
