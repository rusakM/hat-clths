import bookingTypes from "./booking.types";

const INITIAL_STATE = {
  booking: null,
  isFetchng: false,
  error: null,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bookingTypes.FETCH_BOOKING_START:
    case bookingTypes.CREATE_BOOKING_START:
      return {
        ...state,
        isFetchng: true,
      };
    case bookingTypes.FETCH_BOOKING_SUCCESS:
      return {
        ...state,
        isFetchng: false,
        booking: action.payload,
      };
    case bookingTypes.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        isFetchng: false,
      };
    case bookingTypes.CREATE_BOOKING_FAILURE:
    case bookingTypes.FETCH_BOOKING_FAILURE:
      return {
        ...state,
        isFetchng: false,
        error: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default bookingReducer;
