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

const OrderSummary = lazy(() =>
  import("./pages/order-summary-page/order-summery-page.component")
);

const BookingComplete = lazy(() =>
  import("./pages/booking-complete/booking-complete.component")
);

const Account = lazy(() => import("./pages/account/account.component"));

const ErrorPage = lazy(() => import("./pages/error-page/error-page.component"));

const BookingPage = lazy(() => import("./pages/booking/booking.component"));

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
            <Route element={<OrderSummary />} path="/order-summary" />
            <Route element={<BookingComplete />} path="/booking-complete/:id" />
            <Route element={<Account />} path="/account" />
            <Route element={<Account />} path="/account/address" />
            <Route element={<Account />} path="/account/bookings" />
            <Route element={<Account />} path="/account/bookings/:id" />
            <Route element={<ErrorPage />} path="/error" />
            <Route element={<BookingPage />} path="/bookings/:id" />
          </Routes>
        </Suspense>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default App;
