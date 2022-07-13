import axios from "axios";
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

    const user = userData.data.data.user;

    if (user.role === "admin") {
      return user;
    }

    throw new Error("Brak wymaganych uprawnień aby się zalogować");
  } catch (error) {
    if (error.response.status === 401) {
      throw AppError("Nieprawidłowy login lub hasło", 401);
    } else if (error.code === 404) {
      console.log("hereherehere");
      await logout();
      console.log(error);
      throw error;
    } else {
      console.log("hereherehere");
      throw error;
    }
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
