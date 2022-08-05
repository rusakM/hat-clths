import axios from "axios";
import { getData, sendData, AppError } from "./api.functions";

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

export const signUp = async (signUpData) => {
  try {
    const userData = await sendData("/api/users/signup", signUpData, "POST");

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
    throw new Error("Najpier należy się zalogować");
  }
};
