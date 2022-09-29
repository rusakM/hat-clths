import styled from "styled-components";

import { ProductPageContainer } from "../product-page/product-page.styles";

export const Container = styled(ProductPageContainer)`
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ViewerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media (max-width: 480px) {
    padding: 0.5em;
  }

  & > form {
    padding: 1em;
    width: 100%;
    max-width: 500px;
  }
`;
