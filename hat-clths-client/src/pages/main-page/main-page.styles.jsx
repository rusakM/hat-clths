import styled from "styled-components";

import Banner from "../../assets/landing-page/banner.webp";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ParallaxBanner = styled.div`
  height: 30vh;
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.8;
  filter: brightness(75%);
  background-image: url("${Banner}");
  width: 100%;
`;

export const ListsContainer = styled.div`
  width: 80%;
  margin-left: 10%;
  padding: 0.5em 1em;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

export const H3Header = styled.h3`
  padding: 0.5em;
`;

export const NewsletterContainer = styled.div`
  width: 70%;
  margin-left: 15%;
  padding: 2em 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  & > h3 {
    padding-bottom: 1em;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin-left: 5%;
  }
`;

export const NewsletterForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0 1em;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
