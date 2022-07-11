import React from "react";

import { TileContainer, IconContainer, TileDescription } from "./tile.styles";

const IconContainer200px = IconContainer("200px");
const TileContainer200px = TileContainer("200px");

const Tile = ({ children, width, link, descriptionRows }) => (
  <TileContainer200px to={link}>
    <IconContainer200px width={width}>{children}</IconContainer200px>
    {descriptionRows.map((row, num) => (
      <TileDescription key={num}>{row}</TileDescription>
    ))}
  </TileContainer200px>
);

export default Tile;
