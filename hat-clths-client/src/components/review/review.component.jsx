import React from "react";
import Stars from "../stars/stars.component";
import { formatDate } from "../../utils/formatDate";
import { ReviewContainer } from "./review.styles";

const Review = ({ review }) => {
  const {
    rating,
    createdAt,
    user: { name },
  } = review;

  return (
    <ReviewContainer>
      <h5>
        {name.split(" ")[0]}&nbsp;
        <span>
          <Stars rating={rating} />
        </span>
        &nbsp;
        {formatDate(createdAt)}
      </h5>
      <p>{review.review}</p>
    </ReviewContainer>
  );
};

export default Review;
