import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1em;

  @media (max-width: 480px) {
    padding: 0.5em;
  }
`;

export const List = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
