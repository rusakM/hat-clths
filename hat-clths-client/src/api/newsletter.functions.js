import { AppError, sendData, getData } from "./api.functions";

export const sendSubscription = async (email) => {
  try {
    const newsletter = await sendData("/api/newsletter", { email }, "POST");

    return newsletter;
  } catch (error) {
    const { message, statusCode } = error.response.data;
    throw new AppError(message, statusCode);
  }
};

export const unsubscribe = async (id) => {
  try {
    const unsub = await getData(`/api/newsletter/unsubscribe/${id}`);

    return unsub;
  } catch (error) {
    const { message, statusCode } = error.response.data;
    throw new AppError(message, statusCode);
  }
};
