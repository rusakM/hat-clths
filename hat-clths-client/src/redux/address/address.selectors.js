import { createSelector } from "reselect";

const selectAddress = (state) => state.address;

export const selectAddressList = createSelector(
  [selectAddress],
  (address) => address.addressList
);

export const selectAddressError = createSelector(
  [selectAddress],
  (address) => address.addressError
);

export const selectCurrentAddress = createSelector(
  [selectAddress],
  (address) => address.selectedAddress
);

export const selectCurrentInvoice = createSelector(
  [selectAddress],
  (address) => address.selectedInvoice
);

export const selectIsAddressFetching = createSelector(
  [selectAddress],
  (address) => address.isFetching
);

export const selectAddressForInvoice = createSelector(
  [selectAddress],
  (address) => address.addressForInvoice
);

export const selectIsWithInvoice = createSelector(
  [selectAddress],
  (address) => address.orderWithInvoice
);
