import axios from "axios";
import { getData, AppError } from "./api.functions";

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userData = await axios({
      method: "POST",
      url: "/api/users/loginAdmin",
      data: {
        email,
        password,
      },
    });

    return userData.data.data.user;
  } catch (error) {
    const { status } = error.response;
    if (status === 401) {
      throw new AppError("Nieprawidłowy login lub hasło", 401);
    } else if (status === 403) {
      throw new AppError("Brak uprawnień aby się zalogować", 403);
    }
    throw error;
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
