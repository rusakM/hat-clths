import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsAddressFetching } from "../../redux/address/address.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import AddressCardList from "./address-card-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsAddressFetching(state),
});

const AddressCardListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(AddressCardList);

export default AddressCardListContainer;
