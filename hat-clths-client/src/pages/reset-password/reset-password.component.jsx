import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams, Navigate } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import SmallSpinner from "../../components/small-spinner/small-spinner.component";

import { resetPasswordStart } from "../../redux/user/user.actions";
import {
  selectIsLoadingData,
  selectLoginError,
} from "../../redux/user/user.selectors";
import { validatePasswords } from "../../components/account-viewer/passwordValidator";

import { Container } from "../../components/booking-viewer/booking-viewer.styles";

const INITIAL_PASSWORD_DATA = {
  password: "",
  passwordConfirm: "",
};

const ResetPassword = ({ userError, isLoading, resetPasswordStart }) => {
  const { token } = useParams();
  const [passwordData, setPasswordData] = useState(INITIAL_PASSWORD_DATA);
  const [passwordResetStatus, setStatus] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      validatePasswords(passwordData);
      resetPasswordStart(passwordData, token);
      setStatus(true);
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const getErrorMessage = () => {
    if (passwordError) {
      return passwordError;
    }
    if (userError) {
      return userError.message;
    }
    return null;
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  return (
    <Container>
      <h1>Reset hasła</h1>
      <form onSubmit={submitHandler}>
        <FormInput
          label="nowe hasło"
          onChange={changeHandler}
          name="password"
          type="password"
          value={passwordData.password}
          required
        />
        <FormInput
          label="powtórz hasło"
          onChange={changeHandler}
          name="passwordConfirm"
          type="password"
          value={passwordData.passwordConfirm}
          required
        />
        {isLoading && <SmallSpinner />}
        <CustomButton type="submit">Zmień hasło</CustomButton>
        {passwordResetStatus && getErrorMessage() && <p>{getErrorMessage}</p>}
        {passwordResetStatus && !getErrorMessage() && (
          <Navigate to="/" replace={true} />
        )}
      </form>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoadingData,
  userError: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  resetPasswordStart: (passwordData, token) =>
    dispatch(resetPasswordStart(passwordData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
