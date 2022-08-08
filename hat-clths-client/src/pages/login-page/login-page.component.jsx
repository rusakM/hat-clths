import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import Login from "../../components/login/login.component";
import SignUp from "../../components/signup/signup.component";

import { LoginPageContainer } from "./login-page.styles";

const LoginPage = () => {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });
  const [registrationHidden, setRegistrationHidden] = useState(true);

  const toggleRegistrationHidden = () =>
    setRegistrationHidden(!registrationHidden);
  return isMobile ? (
    <LoginPageContainer>
      {registrationHidden ? (
        <Login toggleRegistration={toggleRegistrationHidden} />
      ) : (
        <SignUp toggleRegistration={toggleRegistrationHidden} />
      )}
    </LoginPageContainer>
  ) : (
    <LoginPageContainer>
      <Login />
      <SignUp />
    </LoginPageContainer>
  );
};

export default LoginPage;
