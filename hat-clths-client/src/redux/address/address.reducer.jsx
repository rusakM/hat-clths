import addressTypes from "./address.types";

const INITIAL_STATE = {
  addressList: [],
  isFetching: false,
  selectedAddress: null,
  orderWithInvoice: false,
  selectedInvoice: null,
  addressError: null,
  addressForInvoice: null,
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case addressTypes.FETCH_ADDRESS_START:
      return {
        ...state,
        isFetching: true,
      };
    case addressTypes.FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        addressList: action.payload,
      };
    case addressTypes.FETCH_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        addressError: action.payload,
      };
    case addressTypes.CREATE_ADDRESS:
      const { addressList } = state;
      action.payload.id = addressList.length;
      action.payload.invoice = [];
      addressList.push(action.payload);
      return {
        ...state,
        addressList,
        selectedAddress: action.payload,
      };
    case addressTypes.CREATE_INVOICE:
      let list = state.addressList.map((address) => {
        if (state.addressForInvoice.id === address.id) {
          if (address.invoice && address.invoice.length > 0) {
            action.payload.id = address.invoice.length;
            address.invoice.push(action.payload);
          } else {
            action.payload.id = 0;
            address.invoice = [action.payload];
          }
          action.payload.address = state.addressForInvoice.id;
        }
        return address;
      });
      return {
        ...state,
        addressList: list,
        selectedInvoice: action.payload,
      };
    case addressTypes.SELECT_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case addressTypes.SELECT_INVOICE:
      return {
        ...state,
        selectedInvoice: action.payload,
      };
    case addressTypes.SELECT_INVOICE_ADDRESS:
      return {
        ...state,
        addressForInvoice: action.payload,
      };
    case addressTypes.ACTIVATE_INVOICE:
      if (state.orderWithInvoice) {
        state.addressForInvoice = null;
        state.selectedInvoice = null;
      }
      return {
        ...state,
        orderWithInvoice: !state.orderWithInvoice,
      };
    default:
      return state;
  }
};

export default addressReducer;
