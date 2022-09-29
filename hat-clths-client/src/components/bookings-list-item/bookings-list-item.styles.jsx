import styled, { css } from "styled-components";

const border = css`
  border-top: 1px solid #ccc;
`;

const makeBorder = (props) => (props.border ? border : null);

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  ${makeBorder}

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: initial;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding-bottom: 1em;
  }
`;
