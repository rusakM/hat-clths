import { AppError } from "../../api/api.functions";

export const validateBooking = (data) => {
  if (data.products.length < 1) {
    throw new AppError("Brak produktów w koszyku", 404);
  }
  if (!data.address) {
    throw new AppError("Nie wybrano adresu dostawy", 404);
  }
  if (!data.booking.deliveryType) {
    throw new AppError("Nie wybrano rodzaju dostawy", 404);
  }
  if (data.isWithInvoice) {
    if (!data.invoice) {
      throw new AppError("Nie wybrano danych do faktury", 404);
    }
    if (!data.invoiceAddress) {
      throw new AppError("Nie wybrano adresu dla faktury", 404);
    }
  }
};
