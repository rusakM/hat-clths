import styled from "styled-components";
import { Link } from "react-router-dom";

export const TileContainer = (width) => styled(Link)`
  width: ${width}px;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const IconContainer = (width) => styled.div`
  width: ${width}px;
  height: ${width}px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid #000;
  }

  & > div {
    height: ${width - 6}px;
    width: ${width - 4}px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    margin: 1px;
  }

  & > .icon {
    width: 50%;
    height: 50%;
    font-size: 80px;
  }
`;

export const TileDescription = styled.p`
  text-align: center;
  padding: 2px 5px;
`;
