import CartTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";
import DELIVERY_TYPES from "../../utils/deliveryTypes";

const INITIAL_STATE = {
  cartItems: [],
  paymentMethod: true, //true means payment in advance
  deliveryType: DELIVERY_TYPES.COURIER,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartTypes.CLEAR_CART:
      return {
        ...INITIAL_STATE,
      };
    case CartTypes.SELECT_DELIVERY_TYPE:
      return {
        ...state,
        deliveryType: action.payload,
      };
    case CartTypes.SELECT_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
