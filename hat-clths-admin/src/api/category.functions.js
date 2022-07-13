import { getData, AppError } from "./api.functions";

export const getCategories = async () => {
  try {
    const categories = await getData("/api/categories");

    return categories;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};
