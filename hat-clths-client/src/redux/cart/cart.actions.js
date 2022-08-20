import CartTypes from "./cart.types";

export const addItem = (item) => ({
  type: CartTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartTypes.REMOVE_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartTypes.CLEAR_CART,
});

export const clearItemFromCart = (item) => ({
  type: CartTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const setDeliveryType = (deliveryType) => ({
  type: CartTypes.SELECT_DELIVERY_TYPE,
  payload: deliveryType,
});

export const setPaymentMethod = (paymentMethod) => ({
  type: CartTypes.SELECT_PAYMENT_METHOD,
  payload: paymentMethod,
});
