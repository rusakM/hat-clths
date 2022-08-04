import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import RootContainer from "./components/root-container/root-container.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.css";
const MainPage = lazy(() => import("./pages/main-page/main-page.component"));

const ProductsPage = lazy(() =>
  import("./pages/products-page/products-page.component")
);

const ProductPage = lazy(() =>
  import("./pages/product-page/product-page.component")
);

const App = () => {
  return (
    <div className="App">
      <Header />
      <RootContainer>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<MainPage />} path="/" />
            <Route element={<ProductsPage />} path="/products" />
            <Route path="/products/:id" element={<ProductsPage />} />
            <Route
              path="/products/:category/:productId"
              element={<ProductPage />}
            />
          </Routes>
        </Suspense>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default App;
