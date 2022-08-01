import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import categoryReducer from "./category/category.reducer";
import productReducer from "./products/product.reducer";
import menuReducer from "./mobile-menu/menu.reducer";

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
});

export default persistReducer(persistConfig, rootReducer);
