import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from "./form-input.styles";

const FormInput = ({ handleChange, label, wide, ...otherProps }) => (
  <GroupContainer className={wide && "wide"}>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabel className={`${otherProps.value.length ? "shrink" : ""}`}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
