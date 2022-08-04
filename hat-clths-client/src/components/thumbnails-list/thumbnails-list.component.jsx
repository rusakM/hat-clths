import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

import initialArray from "./initialArray";

import { ThumbnailsContainer, Thumbnail } from "./thumbnails-list.styles";
import { ListButton } from "../top-products-list/top-products-list.styles";

import "./thumbnails-list.styles.css";

const ThumbnailsList = ({ photos, selectedIndex, select }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  const [showedItems, setShowedItems] = useState(initialArray(photos));

  const moveList = (increment = false) => {
    const add = increment ? 1 : -1;
    setShowedItems(
      showedItems.map((item) => {
        if (item + add < 0) {
          return photos.length - 1;
        } else if (item + add === photos.length) {
          return 0;
        }
        return item + add;
      })
    );
  };

  return (
    <ThumbnailsContainer>
      {!isMobile && photos.length > showedItems.length && (
        <ListButton onClick={() => moveList(false)}>
          <FontAwesomeIcon icon={faChevronUp} />
        </ListButton>
      )}
      {isMobile
        ? photos.map((item, index) => (
            <Thumbnail
              key={item}
              style={{
                backgroundImage: `url("/uploads/products/${item}")`,
              }}
              className={item === photos[selectedIndex] ? "bold-border" : ""}
              onClick={() => select(index)}
            />
          ))
        : showedItems.map((item) => (
            <Thumbnail
              key={item}
              style={{
                backgroundImage: `url("/uploads/products/${photos[item]}")`,
              }}
              className={item === selectedIndex ? "bold-border" : ""}
              onClick={() => select(item)}
            />
          ))}

      {!isMobile && photos.length > showedItems.length && (
        <ListButton onClick={() => moveList(true)}>
          <FontAwesomeIcon icon={faChevronDown} />
        </ListButton>
      )}
    </ThumbnailsContainer>
  );
};

export default ThumbnailsList;
