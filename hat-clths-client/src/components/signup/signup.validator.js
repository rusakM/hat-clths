import { AppError } from "../../api/api.functions";

export const validatePasswords = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new AppError("Hasła nie są takie same", 404);
  }

  if (password.length < 8) {
    throw new AppError("Podane hasło jest za krótkie", 404);
  }
};
