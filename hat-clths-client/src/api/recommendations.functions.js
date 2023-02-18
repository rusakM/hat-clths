import { getData, AppError } from "./api.functions";

export const getGenderBasedRecommendations = async (gender) => {
  try {
    const genderName = gender ? "male" : "female";

    let products = await getData(`/api/recommendations/${genderName}`);
    if (products.length > 0) {
      products = products.map((item) => item.productPreview);
    }
    return products;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const getSimilarProducts = async (productId) => {
  try {
    let products = await getData(`/api/recommendations/cold/${productId}`);

    if (products.length > 0) {
      products = products.map(({ similarProduct, similarProductCategory }) => ({
        ...similarProduct,
        category: similarProductCategory,
      }));
    }

    return products;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};

export const getRecommendations = async () => {
  try {
    let products = await getData(`/api/recommendations?limit=10`);

    if (products.length > 0) {
      products = products.map((item) => item.productPreview);
    }

    return products;
  } catch (error) {
    throw new AppError("Błąd pobierania danych...", 404);
  }
};
