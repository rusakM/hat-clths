import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { StarsContainer, OneStar } from "./stars.styles";

const Stars = ({ rating, changeHandler }) => {
  const stars = [1, 2, 3, 4, 5];

  const selectRating = (rating) => {
    if (changeHandler) {
      changeHandler(rating);
    }
  };
  return (
    <StarsContainer>
      {stars.map((star) =>
        star <= rating ? (
          <OneStar onClick={() => selectRating(star)} key={star}>
            <FontAwesomeIcon icon={faStar} />
          </OneStar>
        ) : (
          <OneStar onClick={() => selectRating(star)} key={star}>
            <FontAwesomeIcon icon={farStar} />
          </OneStar>
        )
      )}
    </StarsContainer>
  );
};

export default Stars;
