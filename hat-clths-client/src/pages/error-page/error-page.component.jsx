import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Navigate } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";

import {
  selectErrorMessage,
  selectErrorCode,
} from "../../redux/error/error.selectors";
import { clearError } from "../../redux/error/error.actions";
import { Container, ErrorHeader } from "./error-page.styles";

const ErrorPage = ({ message, code, clearError }) => {
  if (!message) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container>
      <ErrorHeader>Ups!</ErrorHeader>
      <p>{message}</p>
      <p>Kod błędu: {code}</p>
      <CustomButton className="small-button" onClick={() => clearError()}>
        Strona główna
      </CustomButton>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  message: selectErrorMessage,
  code: selectErrorCode,
});

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
