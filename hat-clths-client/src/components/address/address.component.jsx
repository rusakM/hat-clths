import React, { useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Spinner from "../spinner/spinner.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  createAddress,
  selectAddress,
} from "../../redux/address/address.actions";
import {
  selectAddressList,
  selectCurrentAddress,
} from "../../redux/address/address.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import INITIAL_STATE from "./address.state";

import { AddressContainer, AddressForm } from "./address.styles";
import { SummaryRow } from "../../pages/checkout/checkout.styles";

const AddressCardList = lazy(() =>
  import("../address-card-list/address-card-list.container")
);

const Address = ({
  addressList,
  currentUser,
  currentAddress,
  createNewAddress,
  selectAddress,
}) => {
  const [addressData, setAddressData] = useState(INITIAL_STATE);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const userChangeHandler = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const createAddress = (event) => {
    event.preventDefault();
    const user = currentUser ? currentUser : { ...userData, isNew: true };
    createNewAddress(addressData, user);
  };

  return (
    <AddressContainer>
      <h2>Adres dostawy:</h2>
      <Suspense fallback={<Spinner />}>
        {addressList.length > 0 && (
          <AddressCardList
            selectAddress={selectAddress}
            currentAddress={currentAddress}
          />
        )}
      </Suspense>
      <AddressForm onSubmit={createAddress}>
        {!currentUser && (
          <FormInput
            name="name"
            label="imię i nazwisko"
            value={userData.name}
            onChange={userChangeHandler}
            required
            wide
          />
        )}
        {!currentUser && (
          <FormInput
            name="email"
            label="email"
            value={userData.email}
            onChange={userChangeHandler}
            required
            wide
          />
        )}
        <FormInput
          name="street"
          label="ulica"
          value={addressData.street}
          onChange={changeHandler}
          required
          wide
        />
        <SummaryRow>
          <FormInput
            name="houseNumber"
            label="numer domu"
            value={addressData.houseNumber}
            onChange={changeHandler}
            required
            wide
          />
          <FormInput
            name="flatNumber"
            label="numer mieszkania"
            value={addressData.flatNumber}
            onChange={changeHandler}
            wide
          />
        </SummaryRow>
        <SummaryRow>
          <FormInput
            name="zipCode"
            label="kod pocztowy"
            value={addressData.zipCode}
            onChange={changeHandler}
            required
            wide
          />
          <FormInput
            name="city"
            label="miasto"
            value={addressData.city}
            onChange={changeHandler}
            required
            wide
          />
        </SummaryRow>
        <FormInput
          name="phoneNumber"
          label="numer telefonu"
          value={addressData.phoneNumber}
          onChange={changeHandler}
          required
          wide
        />
        <CustomButton type="submit">Zapisz adres</CustomButton>
      </AddressForm>
    </AddressContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  addressList: selectAddressList,
  currentUser: selectCurrentUser,
  currentAddress: selectCurrentAddress,
});

const mapDispatchToProps = (dispatch) => ({
  createNewAddress: (addressData, user) =>
    dispatch(createAddress(addressData, user)),
  selectAddress: (address) => dispatch(selectAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
