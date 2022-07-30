import React from "react";

import { PopupContainer, PopupContent } from "./popup.styles";

const Popup = ({ children }) => (
  <PopupContainer>
    <PopupContent>{children}</PopupContent>
  </PopupContainer>
);

export default Popup;
