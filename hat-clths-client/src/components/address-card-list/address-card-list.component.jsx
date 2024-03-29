import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

import AddressCard from "../address-card/address-card.component";
import { formatAddress } from "../../utils/addressFormatter";

import { selectAddressList } from "../../redux/address/address.selectors";

import { ListContainer, CardsList } from "./address-card-list.styles";

const AddressCardList = ({ addressList, selectAddress, currentAddress }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const defaultLength = 3;
  const buttonsDisplayed = !isMobile && addressList.length > defaultLength;

  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);

  const swipeCards = (dest = false) => {
    if (addressList.length <= defaultLength) {
      return;
    }
    const increment = dest ? 1 : -1;

    setVisibleCards(
      visibleCards.map((card) => {
        let num = card + increment;
        if (num < 0) {
          num = addressList.length - 1;
        } else if (num === addressList.length) {
          num = 0;
        }
        return num;
      })
    );
  };

  const selectCard = (address) => {
    selectAddress(address);
  };

  return (
    <ListContainer>
      {buttonsDisplayed && (
        <h3 onClick={() => swipeCards(false)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </h3>
      )}
      <CardsList>
        {buttonsDisplayed
          ? visibleCards.map((card) => (
              <AddressCard
                rows={formatAddress(addressList[card])}
                key={card}
                eventHandler={() => selectCard(addressList[card])}
                additionalClass={
                  currentAddress &&
                  addressList[card].id === currentAddress.id &&
                  "bold-border"
                }
              />
            ))
          : addressList.map((address) => (
              <AddressCard
                rows={formatAddress(address)}
                key={address.id}
                eventHandler={() => selectCard(address)}
                additionalClass={
                  currentAddress &&
                  address.id === currentAddress.id &&
                  "bold-border"
                }
              />
            ))}
      </CardsList>
      {buttonsDisplayed && (
        <h3 onClick={() => swipeCards(true)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </h3>
      )}
    </ListContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  addressList: selectAddressList,
});

export default connect(mapStateToProps)(AddressCardList);
