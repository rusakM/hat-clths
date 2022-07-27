import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { ThumbnailContainer, ThumbnailTrash } from "./thumbnail.styles";

const Thumbnail = ({ photoUrl, remove, select, ...otherProps }) => (
  <ThumbnailContainer onClick={select} {...otherProps}>
    {remove && (
      <ThumbnailTrash onClick={remove}>
        <FontAwesomeIcon icon={faTrash} />
      </ThumbnailTrash>
    )}
  </ThumbnailContainer>
);

export default Thumbnail;
