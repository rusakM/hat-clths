import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  & > * {
    color: white !important;
  }
`;

export const MenuHeader = styled.div`
  width: 100%;
  heigth: 80px;
  color: #fff;
`;
