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

export const createAddress = (addressData, user) => ({
  type: addressTypes.CREATE_ADDRESS,
  payload: { ...addressData, user },
});

export const createInvoice = (invoiceData) => ({
  type: addressTypes.CREATE_INVOICE,
  payload: { ...invoiceData },
});

export const selectInvoice = (invoice) => ({
  type: addressTypes.SELECT_INVOICE,
  payload: invoice,
});

export const selectAddress = (address) => ({
  type: addressTypes.SELECT_ADDRESS,
  payload: address,
});

export const selectInvoiceAddress = (address) => ({
  type: addressTypes.SELECT_INVOICE_ADDRESS,
  payload: address,
});

export const activateInvoice = () => ({
  type: addressTypes.ACTIVATE_INVOICE,
});

export const deleteAddressStart = (addressId) => ({
  type: addressTypes.DELETE_ADDRESS_START,
  payload: addressId,
});

export const deleteAddressSuccess = (addressId) => ({
  type: addressTypes.DELETE_ADDRESS_SUCCESS,
  payload: addressId,
});

export const deleteAddressFailure = (error) => ({
  type: addressTypes.DELETE_ADDRESS_FAILURE,
  payload: error,
});
