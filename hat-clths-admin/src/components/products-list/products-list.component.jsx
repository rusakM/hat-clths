import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Tile from "../tile/tile.component";
import CustomButton from "../custom-button/custom-button.component";
import formatPrice from "../../utils/formatPrice";
import { selectProducts } from "../../redux/products/product.selectors";
import { toggleEditorVisibility } from "../../redux/category/category.actions";
import { selectCategoryBySlug } from "../../redux/category/category.selectors";
import {
  ProductsListContainer,
  ProductsListRow,
  ProductsListCategoryName,
} from "./products-list.styles";

const ProductsList = ({ category }) => {
  const products = useSelector(selectProducts);
  const cat = useSelector(selectCategoryBySlug(category));
  const dispatch = useDispatch();

  const toggleEditor = () => dispatch(toggleEditorVisibility(cat && cat.slug));

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
      <ProductsListRow>
        {cat && (
          <ProductsListCategoryName>
            {cat.name}
            <span onClick={toggleEditor}>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </ProductsListCategoryName>
        )}
        <Link to={cat ? `/products/${cat.slug}/new` : "/products/newProduct"}>
          <CustomButton>Dodaj produkt</CustomButton>
        </Link>
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
