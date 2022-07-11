import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import RootContainer from "./components/root-container/root-container.component";
import LoginPage from "./pages/login-page/login-page.component";
import ProductsPage from "./pages/products-page/products-page.component";
import MainPage from "./pages/main-page/main-page.component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <RootContainer>
        <ProductsPage />
      </RootContainer>
      <Footer />
    </div>
  );
}

export default App;
