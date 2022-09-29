import { getData, AppError, sendData } from "./api.functions";

export const getMyAddresses = async () => {
  try {
    const addressList = await getData("/api/users/addresses");

    return addressList;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const addressDeleted = !!(await sendData(
      `/api/users/addresses/${addressId}`,
      { active: false },
      "PATCH"
    ));

    return addressDeleted;
  } catch (error) {
    throw error;
  }
};
