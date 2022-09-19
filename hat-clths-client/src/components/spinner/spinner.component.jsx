import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = ({ description }) => (
  <SpinnerOverlay>
    {description && <p>{description}</p>}
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
