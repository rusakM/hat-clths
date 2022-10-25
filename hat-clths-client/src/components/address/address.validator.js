import validator from "validator";
import { AppError } from "../../api/api.functions";

export const validateField = (value, field) => {
  console.log(field, value);
  const reg = new RegExp(/^[A-Z]/);
  switch (field) {
    case "city":
      if (!reg.test(value)) {
        throw new AppError(
          "Nazwa miasta musi zaczynać się z wielkiej litery",
          404
        );
      }
      if (value.length < 3) {
        throw new AppError("Nazwa miasta jest za któtka", 404);
      }
      break;
    case "street":
      if (!reg.test(value)) {
        throw new AppError(
          "Nazwa ulicy musi zaczynać się z wielkiej litery",
          404
        );
      }
      if (value.length < 3) {
        throw new AppError("Nazwa ulicy jest za któtka", 404);
      }
      break;
    case "flatNumber":
      if (!value) {
        break;
      }
      if (!validator.isNumeric(value) || !validator.isEmpty(value)) {
        throw new AppError("Nieprawidłowy numer mieszkania", 404);
      }
      break;
    case "houseNumber":
      if (value.length > 8) {
        throw new AppError("Nieprawidłowy numer domu", 404);
      }
      break;
    case "phoneNumber":
      if (!validator.isMobilePhone(value, "pl-PL")) {
        throw new AppError("Podany numer telefonu jest nieprawidłowy", 404);
      }
      break;
    case "zipCode":
      if (!validator.isPostalCode(value, "PL")) {
        throw new AppError("Kod pocztowy powinien być w formacie: 00-000", 404);
      }
      break;
    case "email":
      if (!validator.isEmail(value)) {
        throw new AppError("Podany adres email jest nieprawidłowy", 404);
      }
      break;
    default:
      break;
  }
};
