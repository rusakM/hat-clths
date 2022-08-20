import addressTypes from "./address.types";

const INITIAL_STATE = {
  addressList: [],
  isFetching: false,
  selectedAddress: null,
  orderWithInvoice: false,
  selectedInvoice: null,
  addressError: null,
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
      addressList.push(action.payload);
      return {
        ...state,
        addressList,
        selectedAddress: action.payload,
      };
    case addressTypes.CREATE_INVOICE:
      let list = state.addressList.map((address) => {
        if (action.payload.address === address.id) {
          address.invoice.push(action.payload);
        }

        return address;
      });
      return {
        ...state,
        addressList: list,
        selectedInvoice: action.payload,
      };
    case addressTypes.SEELCT_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case addressTypes.SELECT_INVOICE:
      return {
        ...state,
        selectedInvoice: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
