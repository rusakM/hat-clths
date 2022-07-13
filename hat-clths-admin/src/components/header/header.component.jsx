import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/top-hat.svg";

import {
  selectCurrentUser,
  selectLoginError,
} from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import {
  HeaderContainer,
  LogoContainer,
  LogoIcon,
  CompanyDescription,
  OptionsContainer,
  OptionsLink,
} from "./header.styles";

const Header = ({ currentUser, loginError, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer>
      <LogoIcon to="/">
        <Logo className="logo" />
      </LogoIcon>
      <CompanyDescription>Hat-clths Panel Admina</CompanyDescription>
    </LogoContainer>
    {currentUser ? (
      <OptionsContainer>
        <OptionsLink to="/orders">Zamówienia</OptionsLink>
        <OptionsLink to="/products">Produkty</OptionsLink>
        <OptionsLink to="/coupons">Kupony</OptionsLink>
        <OptionsLink as="div" onClick={signOutStart}>
          Wyloguj się
        </OptionsLink>
      </OptionsContainer>
    ) : (
      <OptionsContainer>
        <OptionsLink to="/login">Logowanie</OptionsLink>
      </OptionsContainer>
    )}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  loginError: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
