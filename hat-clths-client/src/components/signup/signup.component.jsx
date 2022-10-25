import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { signUpStart, signUpFailure } from "../../redux/user/user.actions";
import { selectSignUpError } from "../../redux/user/user.selectors";
import { validateField } from "../address/address.validator";
import { validatePasswords } from "./signup.validator";

import {
  LoginContainer,
  LoginHeader,
  LoginForm,
  LoginWarn,
  Register,
} from "../login/login.styles";

const SignUp = ({
  signUpStart,
  signUpError,
  toggleRegistration,
  signUpFailure,
}) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });

  const { email, password, name, passwordConfirm } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateField(email, "email");
      validatePasswords(password, passwordConfirm);
      signUpStart(userCredentials);
    } catch (error) {
      console.log("error");
      signUpFailure(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <LoginContainer>
      <LoginHeader>Rejestracja nowego użytkownika:</LoginHeader>
      <LoginForm onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          label="imię i nazwisko"
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
        <FormInput
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={handleChange}
          label="powtórz hasło"
          required
        />
        {signUpError && signUpError.code && (
          <LoginWarn>{signUpError.message}</LoginWarn>
        )}
        <CustomButton type="submit">Zarejestruj się</CustomButton>
      </LoginForm>
      {isMobile && (
        <Register onClick={toggleRegistration}>Powrót do logowania</Register>
      )}
    </LoginContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userData) => dispatch(signUpStart(userData)),
  signUpFailure: (error) => dispatch(signUpFailure(error)),
});

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignUpError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
