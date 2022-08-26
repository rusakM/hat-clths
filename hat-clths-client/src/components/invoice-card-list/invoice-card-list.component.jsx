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
import { formatInvoice } from "../../utils/addressFormatter";

import { selectAddressForInvoice } from "../../redux/address/address.selectors";

import { ListContainer, CardsList } from "./invoice-card-list.styles";

const InvoiceCardList = ({ invoiceAddress, selectInvoice, currentInvoice }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const defaultLength = 3;
  const invoiceList = invoiceAddress.invoice;
  const buttonsDisplayed = !isMobile && invoiceList.length > defaultLength;

  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);

  const swipeCards = (dest = false) => {
    if (invoiceList.length <= defaultLength) {
      return;
    }
    const increment = dest ? 1 : -1;

    setVisibleCards(
      visibleCards.map((card) => {
        let num = card + increment;
        if (num < 0) {
          num = invoiceList.length - 1;
        } else if (num === invoiceList.length) {
          num = 0;
        }
        return num;
      })
    );
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
                rows={formatInvoice(invoiceList[card])}
                key={card}
                eventHandler={() => selectInvoice(invoiceList[card])}
                additionalClass={
                  currentInvoice &&
                  invoiceList[card].id === currentInvoice.id &&
                  currentInvoice.address === invoiceAddress.id &&
                  "bold-border"
                }
              />
            ))
          : invoiceList.map((invoice) => (
              <AddressCard
                rows={formatInvoice(invoice)}
                key={invoice.id}
                eventHandler={() => selectInvoice(invoice)}
                additionalClass={
                  currentInvoice &&
                  invoice.id === currentInvoice.id &&
                  currentInvoice.address === invoiceAddress.id &&
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
  invoiceAddress: selectAddressForInvoice,
});

export default connect(mapStateToProps)(InvoiceCardList);
