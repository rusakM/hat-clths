import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ViewerContainer } from "../../pages/account/account.styles";
import { FormRow } from "../../pages/main-page/main-page.styles";

const passwordPattern = new RegExp(/^password/);

const AccountViewer = ({ currentUser }) => {
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

  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
  });

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
        />
        <FormInput
          label="nowe hasło"
          handleChange={changeHandler}
          name="password"
          type="password"
          value={passwordData.password}
        />
        <FormInput
          label="powtórz hasło"
          handleChange={changeHandler}
          name="passwordConfirm"
          type="password"
          value={passwordData.passwordConfirm}
        />
        <FormRow>
          <CustomButton type="submit">Zmień hasło</CustomButton>
        </FormRow>
      </form>
    </ViewerContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AccountViewer);
