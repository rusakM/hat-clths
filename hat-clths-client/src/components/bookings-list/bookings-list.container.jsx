import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsFetchingData } from "../../redux/booking/booking.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import BookingList from "./bookings-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsFetchingData(state),
});

const BookingListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(BookingList);

export default BookingListContainer;
