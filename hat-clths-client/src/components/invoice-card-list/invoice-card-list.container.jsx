import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsAddressFetching } from "../../redux/address/address.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import InvoiceCardList from "./invoice-card-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsAddressFetching(state),
});

const InvoiceCardListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(InvoiceCardList);

export default InvoiceCardListContainer;
