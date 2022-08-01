import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import RootContainer from "./components/root-container/root-container.component";
import Spinner from "./components/spinner/spinner.component";

import { selectMenuHidden } from "./redux/mobile-menu/menu.selectors";

import "./App.css";

const MobileMenu = lazy(() =>
  import("./components/mobile-menu/mobile-menu.component")
);

const App = () => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  const menuHidden = useSelector(selectMenuHidden);

  return (
    <div className="App">
      <Header />
      <RootContainer>
        <Suspense fallback={<Spinner />}>
          {isMobile && !menuHidden && <MobileMenu />}
          <Routes>
            <Route element={<div></div>} path="/" />
          </Routes>
        </Suspense>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default App;
