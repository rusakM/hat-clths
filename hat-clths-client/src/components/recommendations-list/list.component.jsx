import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Tile from "../tile/tile.component";

import formatPrice from "../../utils/formatPrice";
import createList from "../../utils/createList";

import {
  TopProductsListContainer,
  List,
  ListButton,
} from "../top-products-list/top-products-list.styles";

const ListComponent = ({ products, size, mobileSize, length }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  const [showedItems, setShowedItems] = useState(createList(length));

  const moveList = (increment = false) => {
    const add = increment ? 1 : -1;
    setShowedItems(
      showedItems.map((item) => {
        if (item + add < 0) {
          return products.length - 1;
        } else if (item + add === products.length) {
          return 0;
        }
        return item + add;
      })
    );
  };

  return (
    <TopProductsListContainer>
      {!isMobile && (
        <ListButton onClick={() => moveList(false)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ListButton>
      )}
      {isMobile ? (
        <List>
          {products &&
            products.length > 0 &&
            products.map(
              ({ _id, name, price, imageCover, category: { slug } }) => (
                <Tile
                  width={mobileSize > 0 ? mobileSize : 40}
                  height={mobileSize > 0 ? mobileSize : 40}
                  unit="vw"
                  link={`/products/${slug}/${_id}`}
                  descriptionRows={[name, formatPrice(price)]}
                  key={_id}
                >
                  <div
                    style={{
                      backgroundImage: `url('/uploads/products/${imageCover}')`,
                    }}
                  ></div>
                </Tile>
              )
            )}
        </List>
      ) : (
        products &&
        products.length > 0 &&
        showedItems && (
          <List>
            {showedItems.map((key) => {
              const {
                _id,
                name,
                price,
                imageCover,
                category: { slug },
              } = products[key];
              return (
                <Tile
                  width={size > 0 ? size : 8}
                  height={size > 0 ? size : 8}
                  unit="vw"
                  link={`/products/${slug}/${_id}`}
                  descriptionRows={[name, formatPrice(price)]}
                  key={_id}
                >
                  <div
                    style={{
                      backgroundImage: `url('/uploads/products/${imageCover}')`,
                    }}
                  ></div>
                </Tile>
              );
            })}
          </List>
        )
      )}
      {!isMobile && (
        <ListButton onClick={() => moveList(true)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ListButton>
      )}
    </TopProductsListContainer>
  );
};

export default ListComponent;
