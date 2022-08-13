import styled from "styled-components";

export const CheckoutPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const CheckoutPageList = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #000;
  padding: 1em;
  @media (max-width: 480px) {
    width: 100%;
    padding: 0 0.5em;
    border-right: none;
  }
`;

export const CheckoutSummary = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SummaryRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Line = styled.hr`
  height: 1px;
  border: 1px solid #fff;
  border-top: 1px solid #ddd;
`;
