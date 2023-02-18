import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import categoryReducer from "./category/category.reducer";
import productReducer from "./products/product.reducer";
import menuReducer from "./mobile-menu/menu.reducer";
import cartReducer from "./cart/cart.reducer";
import addressReducer from "./address/address.reducer";
import bookingReducer from "./booking/booking.reducer";
import errorReducer from "./error/error.reducer";
import newsletterReducer from "./newsletter/newsletter.reducer";
import recommendationsReducer from "./recommendations/recommendations.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  products: productReducer,
  mobileMenu: menuReducer,
  cart: cartReducer,
  address: addressReducer,
  booking: bookingReducer,
  error: errorReducer,
  newsletter: newsletterReducer,
  recommendations: recommendationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
