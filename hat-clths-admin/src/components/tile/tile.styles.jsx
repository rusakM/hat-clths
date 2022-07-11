import styled from "styled-components";
import { Link } from "react-router-dom";

export const TileContainer = (width) => styled(Link)`
  width: ${width};
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const IconContainer = (width) => styled.div`
  width: ${width};
  height: ${width};
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid #000;
  }

  & > img {
    width: 100%;
    height: 100%;
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
