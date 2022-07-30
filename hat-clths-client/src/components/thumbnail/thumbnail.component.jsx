import React from "react";
import { ThumbnailContainer } from "./thumbnail.styles";

const Thumbnail = ({ photoUrl, select, ...otherProps }) => (
  <ThumbnailContainer onClick={select} {...otherProps} />
);

export default Thumbnail;
