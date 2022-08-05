import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../spinner/spinner.component";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { fetchCategoriesStart } from "../../redux/category/category.actions";
import { toggleMenuHidden } from "../../redux/mobile-menu/menu.actions";
import { signOutStart } from "../../redux/user/user.actions";

import { MenuContainer, MenuHeader } from "./mobile-menu.styles";
import {
  LogoContainer,
  LogoIcon,
  CompanyDescription,
  OptionsLink,
} from "../header/header.styles";
import { CategoriesListHeader } from "../categories-list/categories-list.styles";

import Logo from "../../assets/top-hat-white.webp";

const CategoriesList = lazy(() =>
  import("../categories-list/categories-list.component")
);
const Menu = ({ fetchCategories, toggleMenu, signOutStart, currentUser }) => {
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <MenuContainer>
      <MenuHeader>
        <LogoContainer>
          <OptionsLink as="div" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </OptionsLink>
          <LogoIcon to="/" onClick={toggleMenu}>
            <img src={Logo} alt="logo" className="logo" />
          </LogoIcon>
          <CompanyDescription>Hat-clths</CompanyDescription>
        </LogoContainer>
      </MenuHeader>
      <Suspense fallback={<Spinner />}>
        <CategoriesList additionalAction={toggleMenu} />
        {currentUser && (
          <Link to="/account" onClick={toggleMenu}>
            <CategoriesListHeader>Moje konto</CategoriesListHeader>
          </Link>
        )}
        <Link to="/cart" onClick={toggleMenu}>
          <CategoriesListHeader>Koszyk</CategoriesListHeader>
        </Link>
        {currentUser ? (
          <CategoriesListHeader
            onClick={() => {
              signOutStart();
              toggleMenu();
            }}
          >
            Wyloguj
          </CategoriesListHeader>
        ) : (
          <Link to="/login" onClick={toggleMenu}>
            <CategoriesListHeader>Logowanie</CategoriesListHeader>
          </Link>
        )}
      </Suspense>
    </MenuContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategoriesStart()),
  toggleMenu: () => dispatch(toggleMenuHidden()),
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
