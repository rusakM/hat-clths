import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 50%;
  height: 50%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

export const LoginHeader = styled.h1`
  font-weight: 900;
  text-align: center;
`;

export const LoginForm = styled.form`
  padding: 1em;
  display: flex;
  flex-direction: column;
  width: 80%;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  justify-content: space-around;

  & > * {
    border: none;
  }

  @media (max-width: 480px) {
    & > * {
      width: 100%;
      margin: 5px 0;
    }
  }
`;

export const LoginWarn = styled.p`
  color: #ff0000;
`;

export const Register = styled.p`
  cursor: pointer;
  text-decoration: underline;
  padding: 1em 0;
`;
