import React from "react";

import { CardContainer } from "./address-card.styles";

const AddressCard = ({ rows, eventHandler, additionalClass }) => (
  <CardContainer onClick={eventHandler} className={additionalClass}>
    {rows.map((row, index) => (
      <span key={index}>{row}</span>
    ))}
  </CardContainer>
);

export default AddressCard;
