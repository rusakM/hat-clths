import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMediaQuery } from "react-responsive";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { signInStart, googleSignInStart } from "../../redux/user/user.actions";
import { selectLoginError } from "../../redux/user/user.selectors";

import {
  LoginContainer,
  LoginHeader,
  LoginForm,
  LoginWarn,
  Register,
  ButtonsContainer,
} from "./login.styles";

const Login = ({
  signInStart,
  googleSignInStart,
  loginError,
  toggleRegistration,
}) => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
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
        <Link
          to="/forgot-password"
          style={{
            padding: "0.5em 0 1.5em 0",
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "medium",
          }}
        >
          Nie pamiętam hasła
        </Link>
        <ButtonsContainer className={isMobile ? "column" : "row"}>
          <CustomButton type="submit">Zaloguj</CustomButton>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              googleSignInStart(credentialResponse);
            }}
            text="signin"
            theme="filled_black"
          />
        </ButtonsContainer>
      </LoginForm>
      {isMobile && (
        <Register onClick={toggleRegistration}>
          Rejestracja nowego użytkownika
        </Register>
      )}
    </LoginContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
  googleSignInStart: (token) => dispatch(googleSignInStart(token)),
});

const mapStateToProps = createStructuredSelector({
  loginError: selectLoginError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
