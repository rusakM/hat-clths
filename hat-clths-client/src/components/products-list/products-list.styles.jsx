import styled from "styled-components";

export const ProductsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  width: 100%;

  @media (max-width: 480px) {
    padding: 0.5em;
  }
`;

export const ProductsListRow = styled.div`
  display: flex;
  flex-diredction: row;
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
`;

export const ProductsListCategoryName = styled.h2`
  padding: 1.5em;

  @media (max-width: 480px) {
    padding: 0;
    width: 100%;
  }
`;
