import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { categorySagas } from "./category/category.sagas";
import { productsSagas } from "./products/product.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(categorySagas), call(productsSagas)]);
}
