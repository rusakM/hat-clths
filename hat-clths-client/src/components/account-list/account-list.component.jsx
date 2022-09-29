import React from "react";
import { useMediaQuery } from "react-responsive";

import {
  AccountListContainer,
  AccountList,
  AccountItem,
} from "./account-list.styles";

const AccountListComponent = () => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  return (
    <AccountListContainer>
      <AccountList>
        <AccountItem to="/account" right={isMobile.toString()}>
          Moje konto
        </AccountItem>
        <AccountItem to="/account/bookings" right={isMobile.toString()}>
          Historia zamówień
        </AccountItem>
        <AccountItem to="/account/address">Adresy dostawy</AccountItem>
      </AccountList>
    </AccountListContainer>
  );
};

export default AccountListComponent;
