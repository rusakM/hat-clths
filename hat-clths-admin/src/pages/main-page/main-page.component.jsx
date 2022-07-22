import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faShoppingCart,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import Tile from "../../components/tile/tile.component";

import { MainPageContainer } from "./main-page.styles";

const MainPage = () => (
  <MainPageContainer>
    <Tile width={200} link="/products" descriptionRows={["Produkty"]}>
      <span className="icon">
        <FontAwesomeIcon icon={faTags} />
      </span>
    </Tile>
    <Tile width={200} link="/orders" descriptionRows={["Zamówienia"]}>
      <span className="icon">
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
    </Tile>
    <Tile width={200} link="/coupons" descriptionRows={["Kupony"]}>
      <span className="icon">
        <FontAwesomeIcon icon={faTicket} />
      </span>
    </Tile>
  </MainPageContainer>
);

export default MainPage;
