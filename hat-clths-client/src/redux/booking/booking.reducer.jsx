import bookingTypes from "./booking.types";

const INITIAL_STATE = {
  booking: null,
  isFetching: false,
  error: null,
  bookingsList: [],
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bookingTypes.FETCH_BOOKING_START:
    case bookingTypes.CREATE_BOOKING_START:
    case bookingTypes.PAY_FOR_BOOKING_START:
    case bookingTypes.FETCH_BOOKING_LIST_START:
      return {
        ...state,
        isFetching: true,
      };
    case bookingTypes.CREATE_BOOKING_SUCCESS:
    case bookingTypes.FETCH_BOOKING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        booking: action.payload,
      };
    case bookingTypes.FETCH_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookingsList: action.payload,
      };
    case bookingTypes.PAY_FOR_BOOKING_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case bookingTypes.CREATE_BOOKING_FAILURE:
    case bookingTypes.FETCH_BOOKING_FAILURE:
    case bookingTypes.PAY_FOR_BOOKING_FAILURE:
    case bookingTypes.FETCH_BOOKING_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        bookingCreatedStatus: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
