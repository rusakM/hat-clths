import React, { useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Spinner from "../spinner/spinner.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  createAddress,
  selectAddress,
  createAddressFailure,
} from "../../redux/address/address.actions";
import {
  selectAddressList,
  selectCurrentAddress,
  selectCreateAddressError,
} from "../../redux/address/address.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import INITIAL_STATE from "./address.state";
import { validateField } from "./address.validator";

import { AddressContainer, AddressForm } from "./address.styles";
import { SummaryRow } from "../../pages/checkout/checkout.styles";

const AddressCardList = lazy(() =>
  import("../address-card-list/address-card-list.container")
);

const Address = ({
  addressList,
  currentUser,
  currentAddress,
  addressFailure,
  createNewAddress,
  selectAddress,
  createAddressFailure,
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
    try {
      const user = currentUser ? currentUser : { ...userData, isNew: true };
      Object.keys(addressData).forEach((key) => {
        validateField(addressData[key], key);
      });
      if (!currentUser) {
        Object.keys(userData).forEach((key) => {
          validateField(userData[key], key);
        });
      }
      createNewAddress(addressData, user);
    } catch (error) {
      createAddressFailure(error);
    }
  };

  return (
    <AddressContainer>
      <h2>Wybierz adres dostawy z listy:</h2>
      <Suspense fallback={<Spinner />}>
        {addressList.length > 0 && (
          <AddressCardList
            selectAddress={selectAddress}
            currentAddress={currentAddress}
          />
        )}
      </Suspense>
      <AddressForm onSubmit={createAddress}>
        <SummaryRow>
          <h2>Lub wypełnij formularz:</h2>
        </SummaryRow>
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
        {addressFailure && <p>{addressFailure.message}</p>}
        <CustomButton type="submit">Zapisz adres</CustomButton>
      </AddressForm>
    </AddressContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  addressList: selectAddressList,
  currentUser: selectCurrentUser,
  currentAddress: selectCurrentAddress,
  addressFailure: selectCreateAddressError,
});

const mapDispatchToProps = (dispatch) => ({
  createNewAddress: (addressData, user) =>
    dispatch(createAddress(addressData, user)),
  selectAddress: (address) => dispatch(selectAddress(address)),
  createAddressFailure: (error) => dispatch(createAddressFailure(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
