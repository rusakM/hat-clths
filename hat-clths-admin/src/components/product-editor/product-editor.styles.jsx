import styled from "styled-components";

export const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const ProductPagePhotosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1em;
  height: 100%;
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
  padding: 1em 0;
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  align-items: center;
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
`;

export const ImageCoverContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1em;
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
`;

export const EditorContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

export const EditorForm = styled.form`
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SizesContainer = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: row;
`;

export const SizesList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #000;
  padding: 5px;
`;
