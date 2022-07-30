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
      <CompanyDescription>Hat-clths</CompanyDescription>
    </LogoContainer>
    <OptionsContainer>
      <OptionsLink to="/forher">Dla niej</OptionsLink>
      <OptionsLink to="/forhim">Dla niego</OptionsLink>
      <OptionsLink to="/cart">Koszyk</OptionsLink>
      {currentUser && <OptionsLink to="/account">Moje konto</OptionsLink>}
      {currentUser ? (
        <OptionsLink as="div" onClick={signOutStart}>
          Wyloguj się
        </OptionsLink>
      ) : (
        <OptionsLink to="/login">Logowanie</OptionsLink>
      )}
    </OptionsContainer>
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
