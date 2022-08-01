import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as Logo } from "../../assets/top-hat.svg";

import {
  selectCurrentUser,
  selectLoginError,
} from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleMenuHidden } from "../../redux/mobile-menu/menu.actions";

import {
  HeaderContainer,
  LogoContainer,
  LogoIcon,
  CompanyDescription,
  OptionsContainer,
  OptionsLink,
} from "./header.styles";

const Header = ({ currentUser, signOutStart, toggleMenu }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  return (
    <HeaderContainer>
      <LogoContainer>
        {isMobile && (
          <OptionsLink
            as="div"
            style={{ fontSize: "x-large" }}
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </OptionsLink>
        )}
        <LogoIcon to="/">
          <Logo className="logo" />
        </LogoIcon>
        <CompanyDescription>Hat-clths</CompanyDescription>
      </LogoContainer>
      <OptionsContainer>
        {!isMobile && <OptionsLink to="/forher">Dla niej</OptionsLink>}
        {!isMobile && <OptionsLink to="/forhim">Dla niego</OptionsLink>}
        {!isMobile && <OptionsLink to="/cart">Koszyk</OptionsLink>}
        {!isMobile && currentUser && (
          <OptionsLink to="/account">Moje konto</OptionsLink>
        )}
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
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  loginError: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleMenu: () => dispatch(toggleMenuHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
