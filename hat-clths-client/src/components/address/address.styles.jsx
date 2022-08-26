import styled from "styled-components";

export const AddressContainer = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    border-right: 1px solid #000;
    padding 1em;

    @media (max-width: 480px) {
        border-right: none;
        width: 100%;
    }
`;

export const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-contnet: space-sround;
  align-items: center;
`;
