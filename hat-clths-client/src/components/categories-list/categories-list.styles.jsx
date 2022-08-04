import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoriesListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #000;
  margin: 2em 0 90px 0;
  height: 100%;
  min-width: 200px;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    margin-bottom: 0px;
  }
`;

export const CategoriesListHeader = styled.h2`
  width: 100%;
  padding: 0.5em 1em;
  cursor: pointer;
`;

export const CategoriesListItems = styled.ul`
  list-style-type: none;
  padding-left: 1em;
  display: flex;
  flex-direction: column;
`;

export const CategoriesListItem = styled(Link)`
  cursor: pointer;
  font-size: large;
  padding-left: 1em;
  & > :hover {
    border-bottom: 1px solid #000;
  }
`;
