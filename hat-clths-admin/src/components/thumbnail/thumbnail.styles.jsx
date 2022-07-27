import styled from "styled-components";

export const ThumbnailContainer = styled.div`
  width: 100px;
  height: 100px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  border: 1px solid #000;
  margin: 2px;
`;

export const ThumbnailTrash = styled.span`
  position: relative;
  top: 70px;
  left: 80px;
  font-size: 1.15em;
  cursor: pointer;
`;
