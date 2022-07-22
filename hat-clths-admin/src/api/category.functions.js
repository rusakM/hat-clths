import { getData, AppError, sendData } from "./api.functions";

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

export const createDocuments = async (data) => {
  try {
    const category = await sendData("/api/categories", data, "POST");
    return category;
  } catch (error) {
    throw new AppError("Błąd podczas tworzenia dokumentu...", 404);
  }
};

export const updateDocuments = async (data, id) => {
  try {
    const category = await sendData(`/api/categories/${id}`, data, "PATCH");
    return category;
  } catch (error) {
    throw new AppError("Błąd podczas tworzenia dokumentu...", 404);
  }
};
