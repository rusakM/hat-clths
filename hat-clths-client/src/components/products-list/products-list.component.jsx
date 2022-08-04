import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Tile from "../tile/tile.component";
import formatPrice from "../../utils/formatPrice";
import { selectProducts } from "../../redux/products/product.selectors";
import { selectCategoryBySlug } from "../../redux/category/category.selectors";
import {
  ProductsListContainer,
  ProductsListRow,
  ProductsListCategoryName,
} from "./products-list.styles";

const ProductsList = ({ category }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const products = useSelector(selectProducts);
  const cat = useSelector(selectCategoryBySlug(category));
  const productsInRow = isMobile ? 2 : 4;
  const tileWidth = isMobile ? 45 : 17.5;

  const mappedProducts = [[]];
  let index = 0;
  for (let i = 0; i < products.length; i++) {
    if (products.length === 0) {
      break;
    }
    if (mappedProducts[index].length === productsInRow) {
      index++;
      mappedProducts.push([]);
    }
    mappedProducts[index].push(products[i]);
  }

  return (
    <ProductsListContainer>
      {cat && <ProductsListCategoryName>{cat.name}</ProductsListCategoryName>}
      <p style={{ textAlign: "right" }}>
        Znaleziono produktów: {products ? products.length : 0}
      </p>
      {products &&
        mappedProducts.map((productsRow, num) => (
          <ProductsListRow key={num}>
            {productsRow.map(({ name, price, id, imageCover, category }) => (
              <Tile
                width={tileWidth}
                unit="vw"
                height={tileWidth}
                link={`/products/${category.slug}/${id}`}
                key={id}
                descriptionRows={[name, formatPrice(price)]}
              >
                <div
                  style={{
                    backgroundImage: `url('/uploads/products/${imageCover}')`,
                  }}
                ></div>
              </Tile>
            ))}
          </ProductsListRow>
        ))}
    </ProductsListContainer>
  );
};

export default ProductsList;
