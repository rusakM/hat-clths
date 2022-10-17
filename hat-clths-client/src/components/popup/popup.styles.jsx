import styled from "styled-components";

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(192, 192, 192, 0.3);
`;

export const PopupContent = styled.div`
  position: absolute;
  background-color: #fff;
  width: 60%;
  min-height: 200px;
  top: 50%;
  transform: translateY(-50%);
  left: 20%;
  border: 1px solid #000;
  padding: 1em;

  @media (max-width: 480px) {
    width: 95%;
    left: 2.5%;
  }
`;
