import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";
import { GoogleLogin } from "@react-oauth/google";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { signInStart } from "../../redux/user/user.actions";
import { selectLoginError } from "../../redux/user/user.selectors";

import {
  LoginContainer,
  LoginHeader,
  LoginForm,
  LoginWarn,
  Register,
  ButtonsContainer,
} from "./login.styles";

const Login = ({ signInStart, loginError, toggleRegistration }) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isGoogleSignInOpened, setGoogleSignIn] = useState(false);

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

  const openGoogleSignIn = (event) => {
    event.preventDefault();
    setGoogleSignIn(!isGoogleSignInOpened)
  };

  return (
    <LoginContainer>
      <LoginHeader>Zaloguj się:</LoginHeader>
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
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="hasło"
          required
        />
        {loginError && loginError.code && (
          <LoginWarn>{loginError.message}</LoginWarn>
        )}
        <ButtonsContainer className={isMobile ? "column" : "row"}>
          <CustomButton type="submit">Zaloguj</CustomButton>
          <CustomButton isGoogleSignIn onClick={openGoogleSignIn}>Logowanie Google</CustomButton>
        </ButtonsContainer>
      </LoginForm>
      {isMobile && (
        <Register onClick={toggleRegistration}>
          Rejestracja nowego użytkownika
        </Register>
      )}
      { isGoogleSignInOpened && <GoogleLogin onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}/> }
    </LoginContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});

const mapStateToProps = createStructuredSelector({
  loginError: selectLoginError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
