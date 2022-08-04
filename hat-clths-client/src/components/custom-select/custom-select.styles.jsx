import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 350px;
  min-width: 250px;
  height: 50px;
  overflow: hidden;
  font-family: "Open Sans Condensed";

  &:after {
    content: "\\25bc";
    position: absolute;
    top: -3px;
    right: 0;
    padding: 1em;
    background-color: #000;
    transition: 0.25s all ease;
    pointer-events: none;
    border-left: 1px solid #fff;
    color: #fff;
  }

  &:hover:after {
    color: #bbb;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: unset;
    min-width: unset;
  }
`;

export const CustomSelectInput = styled.select`
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: #000;
  background-image: none;
  cursor: pointer;
`;
