import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";
import FormInput from "../../components/form-input/form-input.component";

import { forgotPasswordStart } from "../../redux/user/user.actions";
import {
  selectIsLoadingData,
  selectLoginError,
} from "../../redux/user/user.selectors";

import { Container } from "../../components/booking-viewer/booking-viewer.styles";

const ForgotPassword = ({ isLoading, userError, forgotPasswordStart }) => {
  const [sendDataStatus, setStatus] = useState(false);
  const [email, setEmail] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    forgotPasswordStart(email);
    setStatus(true);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Reset hasła</h1>
          <p style={{ padding: "0.5em" }}>
            Na podany adres email zostanie presłana wiadomość z linkiem
            prowadzącym do formularza zmiany hasła
          </p>
          <form onSubmit={submitHandler}>
            <FormInput
              label="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
            <CustomButton type="submit">Reset hasła</CustomButton>
          </form>
          {sendDataStatus &&
            (!userError ? (
              <p>Wiadomość została wysłana. Sprawdź skrzynkę pocztową.</p>
            ) : (
              <p style={{ color: "#ff0000" }}>{userError.message}</p>
            ))}
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoadingData,
  userError: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordStart: (email) => dispatch(forgotPasswordStart(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
