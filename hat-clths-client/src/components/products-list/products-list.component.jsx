import React from "react";
import { useSelector } from "react-redux";

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
  const products = useSelector(selectProducts);
  const cat = useSelector(selectCategoryBySlug(category));

  const mappedProducts = [[]];
  let index = 0;
  for (let i = 0; i < products.length; i++) {
    if (products.length === 0) {
      break;
    }
    if (mappedProducts[index].length === 3) {
      index++;
      mappedProducts.push([]);
    }
    mappedProducts[index].push(products[i]);
  }

  return (
    <ProductsListContainer>
      <ProductsListRow className="space-between">
        <div className="row">
          {cat && (
            <ProductsListCategoryName>{cat.name}</ProductsListCategoryName>
          )}
        </div>
        <p>Znaleziono produktów: {products ? products.length : 0}</p>
      </ProductsListRow>
      {products &&
        mappedProducts.map((productsRow, num) => (
          <ProductsListRow key={num}>
            {productsRow.map(({ name, price, id, imageCover, category }) => (
              <Tile
                width={250}
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
