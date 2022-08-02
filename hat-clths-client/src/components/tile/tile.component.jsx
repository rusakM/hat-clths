import React from "react";

import { TileContainer, IconContainer, TileDescription } from "./tile.styles";

const Tile = ({ children, width, height, link, descriptionRows, unit }) => {
  const TileContainerComponent = TileContainer(
    width,
    unit,
    height ? height : width
  );
  const IconContainerComponent = IconContainer(
    width,
    unit,
    height ? height : width
  );
  return (
    <TileContainerComponent to={link}>
      <IconContainerComponent>{children}</IconContainerComponent>
      {descriptionRows &&
        descriptionRows.map((row, num) => (
          <TileDescription key={num}>{row}</TileDescription>
        ))}
    </TileContainerComponent>
  );
};

export default Tile;
