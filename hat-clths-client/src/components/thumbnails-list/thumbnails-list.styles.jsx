import styled from "styled-components";

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  align-items: center;

  @media (max-width: 480px) {
    display: ruby;
    height: 100%;
    width: 100%;
    margin: 2px -2px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
  }
`;

export const Thumbnail = styled.div`
  width: 100px;
  height: 100px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  border: 1px solid #000;
  margin: 2px;

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;
