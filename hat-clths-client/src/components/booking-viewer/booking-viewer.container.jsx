import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsFetchingData } from "../../redux/booking/booking.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import BookingViewer from "./booking-viewer.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsFetchingData(state),
});

const BookingViewerContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(BookingViewer);

export default BookingViewerContainer;
