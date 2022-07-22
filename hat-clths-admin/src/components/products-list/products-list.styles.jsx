import styled from "styled-components";

export const ProductsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  width: 100%;
`;

export const ProductsListRow = styled.div`
  display: flex;
  flex-diredction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const ProductsListCategoryEditor = styled.div`
  width: 350px;
  padding: 1em;
  display: flex;
  flex-direction: row;
`;

export const ProductsListCategoryName = styled.h2`
  padding: 1.5em;
  & > * {
    padding: 0.25em;
    font-size: 20px;
    cursor: pointer;
  }
`;
