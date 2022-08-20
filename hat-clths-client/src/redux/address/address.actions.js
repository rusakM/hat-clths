import addressTypes from "./address.types";

export const fetchAddressStart = () => ({
  type: addressTypes.FETCH_ADDRESS_START,
});

export const fetchAddressSuccess = (addresses) => ({
  type: addressTypes.FETCH_ADDRESS_SUCCESS,
  payload: addresses,
});

export const fetchAddressFailure = (error) => ({
  type: addressTypes.FETCH_ADDRESS_FAILURE,
  payload: error,
});

export const createAddress = (addressData) => ({
  type: addressTypes.CREATE_ADDRESS,
  payload: addressData,
});

export const createInvoice = (invoiceData, address) => ({
  type: addressTypes.CREATE_INVOICE,
  payload: { ...invoiceData, address },
});

export const selectInvoice = (invoice) => ({
  type: addressTypes.SELECT_INVOICE,
  payload: invoice,
});

export const selectAddress = (address) => ({
  type: addressTypes.SEELCT_ADDRESS,
  payload: address,
});
