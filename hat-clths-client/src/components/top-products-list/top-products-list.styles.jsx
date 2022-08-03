import styled from "styled-components";

export const TopProductsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  align-items: center;
  padding: 1em 0;
  justify-content: space-around;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  justify-content: flex-start;
  @media (max-width: 480px) {
    padding: 0 0.5em;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ListButton = styled.span`
  font-size: 2em;
  padding: 5px;
`;
