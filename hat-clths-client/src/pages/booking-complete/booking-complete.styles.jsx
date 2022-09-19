import styled, { css } from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const redText = css`
  color: #ff0000;
`;

const getError = (props) => props.red && redText;

export const Message = styled.h3`
  margin: 1em;
  ${getError}
`;
