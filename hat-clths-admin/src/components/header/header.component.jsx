import React from "react";
import { ReactComponent as Logo } from "../../assets/top-hat.svg";

import {
  HeaderContainer,
  LogoContainer,
  LogoIcon,
  CompanyDescription,
  OptionsContainer,
  OptionsLink,
} from "./header.styles";

const Header = () => (
  <HeaderContainer>
    <LogoContainer>
      <LogoIcon to="/">
        <Logo className="logo" />
      </LogoIcon>
      <CompanyDescription>Hat-clths Panel Admina</CompanyDescription>
    </LogoContainer>
    <OptionsContainer>
      <OptionsLink to="/orders">Zamówienia</OptionsLink>
      <OptionsLink to="/products">Produkty</OptionsLink>
      <OptionsLink to="/coupons">Kupony</OptionsLink>
      <OptionsLink to="/logout">Wyloguj się</OptionsLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
