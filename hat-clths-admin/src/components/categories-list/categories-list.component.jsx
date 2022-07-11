import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  CategoriesListContainer,
  CategoriesListHeader,
  CategoriesListItems,
  CategoriesListItem,
} from "./categories-list.styles";

const CategoriesList = ({ categories }) => {
  const [visibilityLists, changeVisibilityLists] = useState({
    forHim: false,
    forHer: false,
  });

  const { forHer, forHim } = visibilityLists;

  const men = categories.filter(({ gender }) => gender);
  const women = categories.filter(({ gender }) => !gender);

  const visibilityChange = (name) => {
    changeVisibilityLists({
      ...visibilityLists,
      [name]: !visibilityLists[name],
    });
  };

  return (
    <CategoriesListContainer>
      <CategoriesListHeader
        name="forHer"
        onClick={() => visibilityChange("forHer")}
      >
        Dla niej&nbsp;
        <FontAwesomeIcon icon={forHer ? faChevronUp : faChevronDown} />
      </CategoriesListHeader>
      <CategoriesListItems className={!forHer && "hidden"}>
        {women.map((category, key) => (
          <CategoriesListItem
            to={`/products/${category.slug}`}
            key={key + category.slug}
          >
            {category.name}
          </CategoriesListItem>
        ))}
      </CategoriesListItems>
      <CategoriesListHeader
        name="forHim"
        onClick={() => visibilityChange("forHim")}
      >
        Dla niego&nbsp;
        <FontAwesomeIcon icon={forHim ? faChevronUp : faChevronDown} />
      </CategoriesListHeader>
      <CategoriesListItems className={!forHim && "hidden"}>
        {men.map((category, key) => (
          <CategoriesListItem
            to={`/products/${category.slug}`}
            key={key + category.slug}
          >
            {category.name}
          </CategoriesListItem>
        ))}
      </CategoriesListItems>
    </CategoriesListContainer>
  );
};

export default CategoriesList;
