import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
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
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionsLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
