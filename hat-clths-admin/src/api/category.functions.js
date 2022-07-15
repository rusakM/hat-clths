import { getData, AppError } from "./api.functions";

const categoriesPath = "/api/categories";

export const getDocuments = async (category) => {
  try {
    const path = category
      ? `${categoriesPath}/${category}/products`
      : categoriesPath;
    const categories = await getData(path);

    return categories;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};
