import styled from "styled-components";

export const ListContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #000;
  padding: 1em;
  @media (max-width: 480px) {
    width: 100%;
    padding: 0 0.5em;
    border-right: none;
  }
`;
