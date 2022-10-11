import { AppError } from "../../api/api.functions";

export const validatePasswords = (passwordData) => {
  const { password, passwordConfirm, passwordCurrent } = passwordData;

  if (password !== passwordConfirm) {
    throw new AppError("Podane hasła nie są takie same", 404);
  }

  if (password.length < 8) {
    throw new AppError("Podane hasło jest za krótkie", 404);
  }

  if (passwordCurrent) {
    if (passwordCurrent === password) {
      throw new AppError("Nowe hasło musi być inne niż obecne hasło", 404);
    }
  }

  return true;
};
