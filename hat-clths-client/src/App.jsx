import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import RootContainer from "./components/root-container/root-container.component";
import Spinner from "./components/spinner/spinner.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";
const MainPage = lazy(() => import("./pages/main-page/main-page.component"));

const ProductsPage = lazy(() =>
  import("./pages/products-page/products-page.component")
);

const ProductPage = lazy(() =>
  import("./pages/product-page/product-page.component")
);

const LoginPage = lazy(() => import("./pages/login-page/login-page.component"));

const Checkout = lazy(() => import("./pages/checkout/checkout.component"));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <RootContainer>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<MainPage />} path="/" />
            <Route
              element={
                currentUser ? <Navigate to="/" replace={true} /> : <LoginPage />
              }
              path="/login"
            />
            <Route element={<ProductsPage />} path="/products" />
            <Route path="/products/:id" element={<ProductsPage />} />
            <Route
              path="/products/:category/:productId"
              element={<ProductPage />}
            />
            <Route element={<Checkout />} path="/cart" />
          </Routes>
        </Suspense>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default App;
