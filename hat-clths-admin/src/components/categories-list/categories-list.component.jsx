import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../custom-button/custom-button.component";
import {
  CategoriesListContainer,
  CategoriesListHeader,
  CategoriesListItems,
  CategoriesListItem,
} from "./categories-list.styles";
import { selectCategories } from "../../redux/category/category.selectors";
import { toggleEditorVisibility } from "../../redux/category/category.actions";

const CategoriesList = ({ categories, toggleEditorVisibility }) => {
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
      <div className="centered-div">
        <CustomButton onClick={toggleEditorVisibility}>
          Dodaj kategorię
        </CustomButton>
      </div>
      <Link to="/products">
        <CategoriesListHeader>Nowości</CategoriesListHeader>
      </Link>

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

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEditorVisibility: () => dispatch(toggleEditorVisibility()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
