import styled from "styled-components";

export const CategoryEditorContainer = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;

  & > * {
    padding: 1em;
  }
`;

export const CategoryEditorForm = styled.div`
  width: 100%;
  margin: 1em;
  display: flex;
  flex-direction: column;
`;

export const CategoryEditorGenderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  & > input {
    margin-left: 1.5em;
    margin-right: 5px;
  }
`;

export const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
