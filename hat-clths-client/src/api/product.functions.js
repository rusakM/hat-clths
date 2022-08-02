import { getData, AppError } from "./api.functions";

export const getNewProducts = async () => {
  try {
    const products = await getData("/api/products/new");

    return products;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const getProduct = async (productId) => {
  try {
    const product = await getData(`/api/products/${productId}`);

    return product;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};