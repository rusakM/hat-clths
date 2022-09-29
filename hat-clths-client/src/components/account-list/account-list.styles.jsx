import styled from "styled-components";
import { Link } from "react-router-dom";

export const AccountListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #000;
  margin: 2em 0 90px 0;
  height: 100%;
  min-width: 200px;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    margin: 0px;
    border-right: none;
  }
`;

export const AccountList = styled.ul`
  list-style-type: none;
  padding-left: 1em;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    flex-direction: row;
    padding-left: 0;
    padding: 0.5em 0;
    justify-content: center;
  }
`;

const makeBorder = (props) => {
  if (props.left) {
    return "border-left: 1px solid #000;";
  }
  if (props.right) {
    return "border-right: 1px solid #000;";
  }
  return "";
};

export const AccountItem = styled(Link)`
  cursor: pointer;
  font-size: large;
  padding-left: 1em;
  & > :hover {
    border-bottom: 1px solid #000;
  }

  @media (max-width: 480px) {
    ${makeBorder};
    padding-left: initial;
    padding: 0.25em 0.5em;
    font-size: medium;
  }
`;
