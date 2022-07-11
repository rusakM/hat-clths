import React from "react";

import { Container, Viewer } from "./root-container.styles";

const RootContainer = ({ children }) => (
  <Container>
    <Viewer>{children}</Viewer>
  </Container>
);

export default RootContainer;
