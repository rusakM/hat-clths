import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  LoginPageContainer,
  LoginPageHeader,
  LoginPageForm,
} from "./login-page.styles";

const LoginPage = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <LoginPageContainer>
      <LoginPageHeader>Logowanie do panelu</LoginPageHeader>
      <LoginPageForm>
        <FormInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="hasło"
          required
        />
        <CustomButton type="submit">Zaloguj</CustomButton>
      </LoginPageForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
