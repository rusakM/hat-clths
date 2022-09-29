import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { categorySagas } from "./category/category.sagas";
import { productsSagas } from "./products/product.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { addressSagas } from "./address/address.sagas";
import { bookingSagas } from "./booking/booking.sagas";
import { errorSagas } from "./error/error.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(categorySagas),
    call(productsSagas),
    call(cartSagas),
    call(addressSagas),
    call(bookingSagas),
    call(errorSagas),
  ]);
}
