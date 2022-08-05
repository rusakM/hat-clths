import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { signInStart } from "../../redux/user/user.actions";
import { selectLoginError } from "../../redux/user/user.selectors";

import {
  LoginPageContainer,
  LoginPageHeader,
  LoginPageForm,
  LoginPageWarn,
} from "./login-page.styles";

const LoginPage = ({ signInStart, loginError }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <LoginPageContainer>
      <LoginPageHeader>Zaloguj się:</LoginPageHeader>
      <LoginPageForm onSubmit={handleSubmit}>
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
        {loginError && loginError.code && (
          <LoginPageWarn>{loginError.message}</LoginPageWarn>
        )}
        <CustomButton type="submit">Zaloguj</CustomButton>
      </LoginPageForm>
    </LoginPageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});

const mapStateToProps = createStructuredSelector({
  loginError: selectLoginError,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
