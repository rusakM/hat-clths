import styled from "styled-components";
import { Link } from "react-router-dom";

export const TileContainer = (width, unit, height) => styled(Link)`
  width: ${width}${unit};
  ${height && `height: ${height}${unit};`}
  display: flex;
  flex-direction: column;
  margin: 10px;

  @media (max-width: 480px) {
    margin: 5px;
  }
`;

export const IconContainer = (width, unit, height) => styled.div`
  width: ${width}${unit};
  height: ${height ? height : width}${unit};
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid #000;
  }

  & > div {
    height: ${height ? height - 6 : width - 6}${unit};
    width: ${width - 4}${unit};
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

  & > .background-tile {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

export const TileDescription = styled.p`
  text-align: center;
  padding: 2px 5px;
`;
