import styled from "styled-components";

export const ProductPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProductPageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ProductPagePhotosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1em;
  height: 100%;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0;
  }
`;

export const BackButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em 0.5em;
`;

export const PhotosContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const ImageCoverContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2px 0.5em;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const Image = styled.div`
  width: 35vw;
  height: 35vw;
  max-height: 60vh;
  max-width: 60vh;
  border: 1px solid #000;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  @media (max-width: 480px) {
    margin-left: 12.5%;
    width: 75vw;
    height: 75vw;
  }
`;

export const ProductContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0 0.5em;
  }
`;

export const ProductName = styled.h2`
  width: 100%;
  padding: 1em;

  @media (max-width: 480px) {
    text-align: center;
    padding: 0;
  }
`;

export const SizesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;

  @media (min-width: 480px) {
    & > * {
      margin: 0 10px;
    }
  }

  @media (max-width: 480px) {
    display: block;
    width: 80%;
    margin-left: 10%;
  }
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em 10px;
`;

export const ReviewsContainer = styled.div`
  width: 100%;
  display: block;
  padding: 1em;
  margin-left: 2em;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const ReviewForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 90%;

    & > button {
      margin: 0 1em;
      width: 100%;
    }
  }
`;

export const ReviewField = styled.textarea`
  padding: 5px;
  margin: 0.5em 1em;
  width: 100%;
  height: 70px;
  border: 1px solid #000;

  @media (min-width: 480px) {
    margin-left: 0;
  }
`;
