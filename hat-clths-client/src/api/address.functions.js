import { getData, AppError } from "./api.functions";

export const getMyAddresses = async () => {
  try {
    const addressList = await getData("/api/users/addresses");

    return addressList;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};
