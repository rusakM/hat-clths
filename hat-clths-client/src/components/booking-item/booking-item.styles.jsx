import styled from "styled-components";

export const ItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0.5em;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.25em;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }

  & > a {
    width: 100%;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
