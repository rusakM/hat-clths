import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsAddressFetching } from "../../redux/address/address.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import AddressList from "./address-list.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectIsAddressFetching(state),
});

const AddressListContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(AddressList);

export default AddressListContainer;
