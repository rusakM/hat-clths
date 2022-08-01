import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  background-color: #fff;

  @media (max-width: 480px) {
    height: 80px;
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LogoIcon = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const CompanyDescription = styled.h1`
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: x-large;
  }
`;

export const OptionsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionsLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1.1em;
`;
