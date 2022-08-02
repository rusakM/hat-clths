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
    width: 95%;
    margin-left: 2.5%;
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
