import { getData, sendData, AppError } from "./api.functions";

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

export const createNewProduct = async (productData) => {
  try {
    const product = await sendData("/api/products", productData, "POST", true);

    return product;
  } catch (error) {
    throw new AppError("Błąd przesyłania danych", 404);
  }
};

export const updateProduct = async (productData, productId) => {
  try {
    const product = await sendData(
      `/api/products/${productId}`,
      productData,
      "PATCH",
      true
    );

    return product;
  } catch (error) {
    throw new AppError("Błąd przesyłania danych");
  }
};
