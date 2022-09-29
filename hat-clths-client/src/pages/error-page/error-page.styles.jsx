import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 15%;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 480px) {
    width: 95%;
    margin: 2.5%;
  }
`;

export const ErrorHeader = styled.h1`
  font-size: 4em;
`;
