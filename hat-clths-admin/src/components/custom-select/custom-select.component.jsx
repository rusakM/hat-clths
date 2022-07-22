import React from "react";
import { SelectContainer, CustomSelectInput } from "./custom-select.styles";

const CustomSelect = ({ options, changeHandler, ...otherProps }) => (
  <SelectContainer>
    <CustomSelectInput onChange={changeHandler} {...otherProps}>
      {options.length &&
        options.map(({ value, name }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
    </CustomSelectInput>
  </SelectContainer>
);

export default CustomSelect;
