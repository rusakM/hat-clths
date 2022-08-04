import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "../../utils/formatDate";

import { ReviewContainer } from "./review.styles";

const Review = ({ review }) => {
  const { rating, createdAt, user } = review;

  const Stars = [];

  for (let i = 0; i < rating; i++) {
    Stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  for (let i = 0; i < 5 - rating; i++) {
    Stars.push(<FontAwesomeIcon icon={farStar} key={i + 5} />);
  }

  return (
    <ReviewContainer>
      <h5>
        {user.name.split(" ")[0]}&nbsp;<span>{Stars}</span>&nbsp;
        {formatDate(createdAt)}
      </h5>
      <p>{review.review}</p>
    </ReviewContainer>
  );
};

export default Review;
