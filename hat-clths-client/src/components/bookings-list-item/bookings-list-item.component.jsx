import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import { formatFullDate } from "../../utils/formatDate";
import formatPrice from "../../utils/formatPrice";

import { ListItem, Description } from "./bookings-list-item.styles";

import "./bookings-list-item.styles.css";

const BookingsListItem = ({ border, bookingData }) => {
  const { id, createdAt, total, deliveryType, history, barcode } = bookingData;

  return (
    <ListItem border={border}>
      <Description>
        <h4>Zamówienie nr: {`#${barcode ? barcode : id}`}</h4>
        <p>{formatFullDate(createdAt)}</p>
        <p>Status: {history[0].description}</p>
        <p>Rodaj dostawy: {deliveryType}</p>
        <h3>Wartość zamówienia: {formatPrice(total)}</h3>
      </Description>
      <Link to={`/account/bookings/${id}`}>
        <CustomButton className="small-button">Szczegóły</CustomButton>
      </Link>
    </ListItem>
  );
};

export default BookingsListItem;
