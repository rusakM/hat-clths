import React from "react";
import axios from "axios";
import CategoriesList from "../../components/categories-list/categories-list.component";
import { ProductsPageContainer } from "./products-page.styles";

const ProductsPage = () => {
  const categories = [
    {
      name: "Spodnie damskie",
      slug: "spodnie-damskie",
      gender: false,
    },
    {
      name: "Spodnie męskie",
      slug: "spodnie-meskie",
      gender: true,
    },
    {
      name: "Kapelusze",
      slug: "kapelusze",
      gender: true,
    },
  ];
  return (
    <ProductsPageContainer>
      <CategoriesList categories={categories} />
    </ProductsPageContainer>
  );
};

export default ProductsPage;
