import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import SmallSpinner from "../small-spinner/small-spinner.component";
import Popup from "../popup/popup.component";

import {
  selectCurrentUser,
  selectIsLoadingData,
  selectLoginError,
} from "../../redux/user/user.selectors";
import {
  changePasswordStart,
  userErrorClear,
} from "../../redux/user/user.actions";

import { ViewerContainer } from "../../pages/account/account.styles";
import { FormRow } from "../../pages/main-page/main-page.styles";
import { validatePasswords } from "./passwordValidator";

const passwordPattern = new RegExp(/^password/);
const INITIAL_PASSWORD_DATA = {
  password: "",
  passwordConfirm: "",
  passwordCurrent: "",
};

const AccountViewer = ({
  currentUser,
  isLoading,
  userError,
  changePassword,
  userErrorClear,
}) => {
  const getField = (field) => {
    if (!currentUser) {
      return "";
    }
    if (!currentUser[field]) {
      return "";
    }
    return currentUser[field];
  };

  const [accountData, setAccountData] = useState({
    name: getField("name"),
    email: getField("email"),
    newsletter: false,
  });

  const [passwordError, setPasswordError] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordData, setPasswordData] = useState(INITIAL_PASSWORD_DATA);

  const changeHandler = (event) => {
    const { value, name } = event.target;

    if (passwordPattern.test(name)) {
      setPasswordData({
        ...passwordData,
        [name]: value,
      });
    } else {
      setAccountData({
        ...accountData,
        [name]: value,
      });
    }
  };

  const newsletterHandler = (event) => {
    const { checked } = event.target;

    setAccountData({
      ...accountData,
      newsletter: checked,
    });
  };

  const modifyAccount = (event) => {
    event.preventDefault();
  };

  const modifyPassword = (event) => {
    event.preventDefault();
    try {
      validatePasswords(passwordData);
      changePassword(passwordData);
      setPasswordMessage("Hasło zostało zmienione");
      setPasswordData(INITIAL_PASSWORD_DATA);
    } catch (error) {
      const { message } = error;
      setPasswordError(message);
    }
  };

  return (
    <ViewerContainer>
      <h2>Moje konto</h2>
      <form onSubmit={modifyAccount}>
        <FormInput
          label="imię i nazwisko"
          handleChange={changeHandler}
          name="name"
          value={accountData.name}
        />
        <FormInput
          label="email"
          handleChange={changeHandler}
          name="email"
          value={accountData.email}
        />
        <FormRow>
          <input
            type="checkbox"
            name="newsletter"
            checked={accountData.newsletter}
            id="newsletter"
            onChange={newsletterHandler}
          />
          <label htmlFor="newsletter">Zgoda na otrzymywanie newslettera</label>
        </FormRow>
        <FormRow>
          <CustomButton type="submit">Zapisz zmiany</CustomButton>
        </FormRow>
      </form>
      <h2>Zmiana hasła</h2>
      <form onSubmit={modifyPassword}>
        <FormInput
          label="stare hasło"
          handleChange={changeHandler}
          type="password"
          name="passwordCurrent"
          value={passwordData.passwordCurrent}
          required
        />
        <FormInput
          label="nowe hasło"
          handleChange={changeHandler}
          name="password"
          type="password"
          value={passwordData.password}
          required
        />
        <FormInput
          label="powtórz hasło"
          handleChange={changeHandler}
          name="passwordConfirm"
          type="password"
          value={passwordData.passwordConfirm}
          required
        />
        <FormRow>
          <CustomButton type="submit">Zmień hasło</CustomButton>
          {isLoading && <SmallSpinner />}
        </FormRow>
        <FormRow>
          {passwordMessage && !userError && <p>{passwordMessage}</p>}
        </FormRow>
      </form>
      {passwordError && (
        <Popup>
          <h2>Błąd</h2>
          <p>{passwordError}</p>
          <CustomButton
            onClick={() => setPasswordError(null)}
            style={{
              marginTop: "1em",
              transform: "translateX(-50%)",
              marginLeft: "50%",
            }}
          >
            OK
          </CustomButton>
        </Popup>
      )}
      {userError && (
        <Popup>
          <h2>Błąd</h2>
          <p>{userError.message}</p>
          <CustomButton
            onClick={() => {
              userErrorClear();
              setPasswordMessage("");
            }}
            style={{
              marginTop: "1em",
              transform: "translateX(-50%)",
              marginLeft: "50%",
            }}
          >
            OK
          </CustomButton>
        </Popup>
      )}
    </ViewerContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoadingData,
  userError: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (passwordData) => dispatch(changePasswordStart(passwordData)),
  userErrorClear: () => dispatch(userErrorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountViewer);
