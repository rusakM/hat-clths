import styled from "styled-components";

export const CardContainer = styled.div`
  width: 25%;
  margin: 2.5%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  cursor: pointer;

  &:hover {
    border-width: 2px;
  }

  @media (max-width: 480px) {
    width: 40%;
  }
`;
