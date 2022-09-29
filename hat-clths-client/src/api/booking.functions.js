import { getData, sendData, AppError } from "./api.functions";
import { loadStripe } from "@stripe/stripe-js";

export const getBooking = async (bookingId, accessToken) => {
  try {
    const tokenParam = accessToken ? `?accessToken=${accessToken}` : "";
    const bookingData = await getData(
      `/api/bookings/${bookingId}${tokenParam}`
    );

    return bookingData;
  } catch (error) {
    const { message, statusCode } = error.response.data;
    throw new AppError(message, statusCode);
  }
};

export const createBooking = async (bookingData) => {
  try {
    const newBooking = await sendData("/api/bookings", bookingData, "POST");

    return newBooking;
  } catch (error) {
    throw new AppError(error.message || "Wystapił nieoczekiwany błąd", 404);
  }
};

export const payForBooking = async (bookingId, accessToken) => {
  try {
    const tokenParam = accessToken ? `?accessToken=${accessToken}` : "";
    const bookingData = await getData(
      `/api/bookings/payForBooking/${bookingId}${tokenParam}`
    );

    return bookingData;
  } catch (error) {
    throw new AppError("Błąd pobierania danych", 404);
  }
};

export const redirectToPaymentSession = async (bookingData) => {
  const { session, stripeKey } = bookingData;

  if (session) {
    const stripe = await loadStripe(stripeKey);

    stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } else {
    return false;
  }
};

export const getBookingList = async () => {
  try {
    const bookingList = await getData("/api/bookings");

    return bookingList;
  } catch (error) {
    throw new AppError("Błąd pobbierania danych", 404);
  }
};
