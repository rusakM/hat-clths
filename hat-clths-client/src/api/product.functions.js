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

export const getTopProducts = async (limit) => {
  try {
    const products = await getData(
      `/api/products/new${limit && `?limit=${limit}`}`
    );

    return products;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const getReviews = async (productId) => {
  try {
    const reviews = await getData(`/api/products/${productId}/reviews`);

    return reviews;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const sendReview = async (reviewData, productId) => {
  try {
    const review = await sendData(
      `/api/products/${productId}/reviews`,
      reviewData,
      "POST",
      false
    );

    return review;
  } catch (error) {
    throw new AppError("Błąd wysyłania danych...", 404);
  }
};
