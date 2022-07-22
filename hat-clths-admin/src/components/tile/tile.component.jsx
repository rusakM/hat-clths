import React from "react";

import { TileContainer, IconContainer, TileDescription } from "./tile.styles";

const Tile = ({ children, width, link, descriptionRows }) => {
  const TileContainerComponent = TileContainer(width);
  const IconContainerComponent = IconContainer(width);
  return (
    <TileContainerComponent to={link}>
      <IconContainerComponent>{children}</IconContainerComponent>
      {descriptionRows.map((row, num) => (
        <TileDescription key={num}>{row}</TileDescription>
      ))}
    </TileContainerComponent>
  );
};

export default Tile;
