import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  selectCategoryBySlug,
  selectCategoryToEdit,
} from "../../redux/category/category.selectors";
import {
  toggleEditorVisibility,
  createCategoryStart,
  updateCategoryStart,
} from "../../redux/category/category.actions";
import {
  CategoryEditorContainer,
  CategoryEditorForm,
  ButtonsRow,
  CategoryEditorGenderRow,
} from "./category-editor.styles";

const CategoryEditor = () => {
  let categoryToEdit = useSelector(selectCategoryToEdit);
  let category = useSelector(selectCategoryBySlug(categoryToEdit));
  const dispatch = useDispatch();

  const closePopup = () => dispatch(toggleEditorVisibility());

  const [categoryData, setCategoryData] = useState({
    name: category ? category.name : "",
    gender: category ? category.gender : false,
  });

  const { name, gender } = categoryData;

  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      name: event.target.value,
    });
  };

  const handleSave = () => {
    if (category) {
      const { id } = category;
      return dispatch(updateCategoryStart({ ...categoryData, id }));
    }
    return dispatch(createCategoryStart(categoryData));
  };

  const isTrue = (val) => val === "true";

  const selectGender = (event) => {
    setCategoryData({
      ...categoryData,
      gender: isTrue(event.target.value),
    });
  };

  return (
    <CategoryEditorContainer>
      <h2>{category ? "Edytuj kategorię:" : "Nowa kategoria:"}</h2>
      <CategoryEditorForm>
        <FormInput
          name="name"
          type="email"
          value={name}
          onChange={handleChange}
          label="Nazwa kategorii"
          required
        />
        <p>Płeć:</p>
        <CategoryEditorGenderRow>
          <input
            type="radio"
            name="gender"
            value={false}
            id="rdb-gender-female"
            checked={gender === false}
            onChange={selectGender}
          />
          <label htmlFor="rdb-gender-female">Dla niej</label>
          <input
            type="radio"
            name="gender"
            value={true}
            id="rdb-gender-male"
            checked={gender === true}
            onChange={selectGender}
          />
          <label htmlFor="rdb-gender-male">Dla niego</label>
        </CategoryEditorGenderRow>
      </CategoryEditorForm>
      <ButtonsRow>
        <CustomButton onClick={handleSave}>Zapisz</CustomButton>
        <CustomButton onClick={closePopup}>Zamknij</CustomButton>
      </ButtonsRow>
    </CategoryEditorContainer>
  );
};

export default CategoryEditor;
