import React, { useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import RootContainer from "./components/root-container/root-container.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

const LoginPage = lazy(() => import("./pages/login-page/login-page.component"));
const ProductsPage = lazy(() =>
  import("./pages/products-page/products-page.component")
);
const MainPage = lazy(() => import("./pages/main-page/main-page.component"));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  console.log(currentUser);
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <RootContainer>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              exact
              element={
                currentUser ? (
                  <MainPage />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
              path="/"
            ></Route>
            <Route
              path="/products"
              element={
                currentUser ? (
                  <ProductsPage />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            ></Route>
            <Route
              path="/login"
              exact
              element={
                currentUser ? <Navigate to="/" replace={true} /> : <LoginPage />
              }
            />
          </Routes>
        </Suspense>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default App;
