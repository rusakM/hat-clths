import React from "react";
import { formatFullDate } from "../../utils/formatDate";

import { ItemContainer } from "./booking-history-item.styles";

const BookingHistoryItem = ({ item: { createdAt, description }, num }) => (
  <ItemContainer>
    <h4>
      {`#${num}: `}
      {description}
    </h4>
    <p>{formatFullDate(createdAt)}</p>
  </ItemContainer>
);

export default BookingHistoryItem;
