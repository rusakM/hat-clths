import styled from "styled-components";

import { ListItem } from "../bookings-list-item/bookings-list-item.styles";

export const ListItemAddress = styled(ListItem)`
  @media (max-width: 480px) {
    flex-direction: row !important;
    justify-content: space-around;
  }
`;
