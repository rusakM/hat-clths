import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import AddressListItem from "../address-list-item/address-list-item.component";

import { selectAddressList } from "../../redux/address/address.selectors";
import { Container, List } from "../bookings-list/bookings-list.styles";

const AddressList = ({ addressList }) => {
  return (
    <Container>
      <h2>Moje adresy:</h2>
      <List>
        {(!addressList || addressList.length === 0) && (
          <li>
            <p>Lista adresów jest pusta</p>
          </li>
        )}
        {addressList &&
          addressList.length > 0 &&
          addressList.map((item, index) => (
            <AddressListItem
              addressData={item}
              key={item.id}
              border={index > 0}
            />
          ))}
      </List>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  addressList: selectAddressList,
});

export default connect(mapStateToProps)(AddressList);
