import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  flex-direction: row;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1em;
`;

export const TextContainer = styled.span`
  width: 23%;
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  span {
    margin: 0 10px;
  }
  div {
    cursor: pointer;
  }
`;

export const RedText = styled.p`
  color: #ff0000;
  cursor: pointer;
`;
