import React from "react";
import OrderItem from "../order-item/order-item.component";

import { ListContainer } from "./order-list.styles";

const OrderList = ({ productsList }) => (
  <ListContainer>
    {productsList.map((product) => (
      <OrderItem product={product} key={product._id} />
    ))}
  </ListContainer>
);

export default OrderList;
