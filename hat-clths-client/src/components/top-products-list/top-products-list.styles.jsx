import styled from "styled-components";

export const TopProductsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  align-items: center;
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  justify-content: center;
  @media (max-width: 480px) {
    padding-left: 0.5em;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
