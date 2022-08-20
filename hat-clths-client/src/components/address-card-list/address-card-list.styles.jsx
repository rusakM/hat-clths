import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  padding: 0.5em;
  display: flex;
  flex-direction: row;
`;

export const CardsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 480px) {
    overflow-x: auto;
    padding: 0 0.5em;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
