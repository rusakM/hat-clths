import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { deleteAddressStart } from "../../redux/address/address.actions";
import { Description } from "../bookings-list-item/bookings-list-item.styles";
import { ListItemAddress } from "./address-list-item.styles";

import "../bookings-list-item/bookings-list-item.styles.css";

const AddressListItem = ({ border, addressData, deleteAddress }) => {
  const { id, city, street, flatNumber, houseNumber, phoneNumber, zipCode } =
    addressData;

  return (
    <ListItemAddress border={border}>
      <Description>
        <p>
          {street}&nbsp;{houseNumber}
          {flatNumber && ` m. ${flatNumber}`}
        </p>
        <p>
          {zipCode} {city}
        </p>
        <p>{phoneNumber}</p>
      </Description>
      <CustomButton className="small-button" onClick={() => deleteAddress(id)}>
        Usuń
      </CustomButton>
    </ListItemAddress>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteAddress: (id) => dispatch(deleteAddressStart(id)),
});

export default connect(null, mapDispatchToProps)(AddressListItem);
