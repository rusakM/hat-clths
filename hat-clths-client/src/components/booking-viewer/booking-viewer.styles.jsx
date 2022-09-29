import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;

  @media (min-width: 768px) {
    max-width: 70%;
    margin-left: 15%;
  }
`;

export const AddressViewer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const DeliveryContainer = styled(AddressViewer)`
  @media (max-width: 480px) {
    flex-direction: column;
  }

  & > div {
    padding: 0 1em;
  }
`;
