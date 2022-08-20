import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageConstainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const BackBtn = styled(Link)`
  padding-left: 3em;
  @media (max-width: 480px) {
    padding-left: 1em;
  }
`;

export const ContainersRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
