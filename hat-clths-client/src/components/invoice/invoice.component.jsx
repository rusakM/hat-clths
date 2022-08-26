import React, { useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import Spinner from "../spinner/spinner.component";

import {
  selectAddressList,
  selectCurrentInvoice,
  selectAddressForInvoice,
  selectIsWithInvoice,
} from "../../redux/address/address.selectors";
import {
  selectInvoice,
  selectInvoiceAddress,
  activateInvoice,
  createInvoice,
} from "../../redux/address/address.actions";

import { AddressContainer, AddressForm } from "../address/address.styles";
import INITIAL_STATE from "./invoice.state";

const AddressCardList = lazy(() =>
  import("../address-card-list/address-card-list.container")
);

const InvoiceCardList = lazy(() =>
  import("../invoice-card-list/invoice-card-list.container")
);

const Invoice = ({
  addressList,
  currentInvoice,
  invoiceAddress,
  isWithInvoice,
  selectInvoice,
  selectInvoiceAddress,
  activateInvoice,
  createInvoice,
}) => {
  const [invoiceData, setInvoiceData] = useState(INITIAL_STATE);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const selectAddress = (address) => {
    if (isWithInvoice) {
      selectInvoiceAddress(address);
    }
  };

  const chooseInvoice = (invoice) => {
    if (isWithInvoice && invoiceAddress) {
      selectInvoice(invoice);
    }
  };

  const invoiceHandler = (event) => {
    event.preventDefault();
    if (invoiceData.nip === "" || invoiceData.company === "") {
      return;
    }
    createInvoice(invoiceData);
  };

  return (
    <AddressContainer>
      <h2>Dane do faktury:</h2>
      <div style={{ padding: "1em" }}>
        <input
          type="checkbox"
          checked={isWithInvoice}
          onChange={activateInvoice}
          id="isWithInvoice"
        />
        <label htmlFor="isWithInvoice">&nbsp;Chcę otrzymać fakturę</label>
      </div>
      <Suspense fallback={<Spinner />}>
        {addressList.length > 0 && (
          <AddressCardList
            currentAddress={invoiceAddress}
            selectAddress={selectAddress}
          />
        )}
        {invoiceAddress && (
          <InvoiceCardList
            currentInvoice={currentInvoice}
            selectInvoice={chooseInvoice}
          />
        )}
      </Suspense>
      <AddressForm onSubmit={invoiceHandler}>
        <FormInput
          value={invoiceData.company}
          label="nazwa firmy"
          name="company"
          onChange={changeHandler}
          disabled={!isWithInvoice}
          required
          wide
        />
        <FormInput
          value={invoiceData.nip}
          name="nip"
          label="nip"
          onChange={changeHandler}
          disabled={!isWithInvoice}
          required
          wide
        />
        <CustomButton type="submit">Zapisz dane</CustomButton>
      </AddressForm>
    </AddressContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  addressList: selectAddressList,
  currentInvoice: selectCurrentInvoice,
  invoiceAddress: selectAddressForInvoice,
  isWithInvoice: selectIsWithInvoice,
});

const mapDispatchToProps = (dispatch) => ({
  selectInvoice: (invoice) => dispatch(selectInvoice(invoice)),
  selectInvoiceAddress: (address) => dispatch(selectInvoiceAddress(address)),
  activateInvoice: () => dispatch(activateInvoice()),
  createInvoice: (invoice) => dispatch(createInvoice(invoice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
