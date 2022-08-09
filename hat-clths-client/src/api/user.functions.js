import axios from "axios";
import validator from "validator";

import { getData, AppError } from "./api.functions";

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userData = await axios({
      method: "POST",
      url: "/api/users/login",
      data: {
        email,
        password,
      },
    });

    return userData.data.data.user;
  } catch (error) {
    console.log(error);
    const { status } = error.response;
    if (status === 401) {
      throw new AppError("Nieprawidłowy login lub hasło", 401);
    }
    throw error;
  }
};

export const loginWithGoogle = async (token) => {
  try {
    const userData = await axios({
      method: "POST",
      url: "/api/users/googleLogin",
      data: token,
    });

    return userData.data.data.user;
  } catch (error) {
    throw new AppError("Nie można zalogować", 400);
  }
};

export const signUp = async (signUpData) => {
  try {
    console.log(signUpData);
    const userData = await axios({
      url: "/api/users/signup",
      data: signUpData,
      method: "POST",
    });

    return userData.data.data.user;
  } catch (error) {
    throw new AppError("Nie można utworzyć konta użytkownika", 404);
  }
};

export const logout = async () => {
  await axios({
    method: "GET",
    url: "/api/users/logout",
  });
};

export const getCurrentUser = async () => {
  try {
    return await getData("/api/users/me");
  } catch (error) {
    throw new Error("Najpierw należy się zalogować");
  }
};

export const validateNewUser = ({ email, password, passwordConfirm, name }) => {
  try {
    const notEmptyTest = email && password && passwordConfirm && name;
    if (!notEmptyTest) {
      throw new AppError(
        "Brak wymaganych informacji aby się zarejestrować",
        400
      );
    }
    if (password !== passwordConfirm) {
      throw new AppError("Podane hasła nie są takie same", 400);
    }
    if (!validator.isEmail(email)) {
      throw new AppError("Podany adres Email jest nieprawidłowy", 400);
    }
    if (password.length < 8) {
      throw new AppError("Hasło musi składać się z przynajmniej 8 znaków", 400);
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minNumbers: 1,
        minUppercase: 0,
        minSymbols: 0,
        minLowercase: 0,
      })
    ) {
      throw new AppError("Podane hasło jest zbyt słabe", 400);
    }
  } catch (error) {
    throw error;
  }
  return true;
};
