import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import RootContainer from "./components/root-container/root-container.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <RootContainer>
        <Suspense fallback={<Spinner />}>
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
